import { Button } from "@material-tailwind/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function Home() {
  return (
    <>
      <div className="page-container flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="baby-quote-container w-full bg-pink-200 flex items-center justify-center mb-11 mt-11 py-10">
          <div className="baby-quote max-w-xl text-center">
            <p className="baby-quote-text text-lg font-semibold text-white">
              "Waah I'm a baby"
            </p>
          </div>
        </div>
        <div className="info-allignment flex justify-center">
        <div className="info-container w-2/3 flex flex-row justify-center items-stretch h-[100px] gap-4 mb-6">
  <div className="info-box bg-white shadow-md rounded-lg p-4 flex-1 w-1/2">
    <p className="info-text text-center text-md font-medium">Blog</p>
  </div>
  <Button color="blue">
    Get Started
  </Button>
  <div className="info-box bg-white shadow-md rounded-lg p-4 flex-1 w-1/2">
    <p className="info-text text-center text-md font-medium text-gray-800">AI</p>
  </div>
</div>
</div>
<Footer />
      </div>
    </>
  );
}