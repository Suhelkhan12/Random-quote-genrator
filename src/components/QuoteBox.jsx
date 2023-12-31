import { useState } from "react";
import "./quoteBox.css";

const QuoteBox = () => {
  const [advice, setAdvice] = useState("Get your daily advice!");
  const [isLoading, setIsloading] = useState(false);

  const getAdvie = async function () {
    setIsloading(true);
    const apiResponse = await fetch("https://api.adviceslip.com/advice");
    const apiAdvice = await apiResponse.json();
    setAdvice(apiAdvice.slip.advice);
    setIsloading(false);
  };
  console.log(advice);
  return (
    <div className="quoteBox">
      <div>
        {isLoading ? (
          <p style={{ color: "#111", textAlign: "center" }}>Generating...</p>
        ) : (
          <h1>{advice}</h1>
        )}
      </div>
      <button onClick={getAdvie}>Click me!</button>
    </div>
  );
};

export default QuoteBox;
