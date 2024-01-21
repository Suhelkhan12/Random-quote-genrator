import { useEffect, useState } from "react";
import "./quoteBox.css";

const QuoteBox = () => {
  const [advice, setAdvice] = useState("Get your daily advice!");
  const [btnClicked, setBtnClicked] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getAdvice = async function () {
      try {
        setIsloading(true);
        const apiResponse = await fetch("https://api.adviceslip.com/advice", {
          signal,
        });
        const apiAdvice = await apiResponse.json();

        if (!apiResponse.ok) {
          throw new Error("Something went wrong");
        }
        setAdvice(apiAdvice.slip.advice);
      } catch (err) {
        console.log(err);
        if (err.name !== "AbortController") {
          setError(err.message);
        }
      }

      setIsloading(false);
    };
    getAdvice();

    return () => {
      controller.abort();
    };
  }, [btnClicked]);

  let content = <h1>{advice}</h1>;

  if (isLoading)
    <p style={{ color: "#111", textAlign: "center" }}>Generating</p>;

  if (error)
    <p style={{ color: "red", textAlign: "center" }}>Something went wrong</p>;

  return (
    <div className="quoteBox">
      <div>{content}</div>
      <button onClick={() => setBtnClicked((prev) => !prev)}>Next</button>
    </div>
  );
};

export default QuoteBox;
