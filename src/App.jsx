import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./customHookes/UseCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (!currencyInfo[to]) return;
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg')",
      }}
    >
      <div className="w-full max-w-md mx-auto border rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* FROM */}
          <InputBox
            label="From"
            type="number"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onCurrencyChange={(currency) => setFrom(currency)}
            onAmountChange={(value) => setAmount(value)}
          />

          {/* SWAP */}
          <div className="relative w-full h-0.5 my-4">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-1"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          {/* TO */}
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={(currency) => setTo(currency)}
            amountDisable
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
