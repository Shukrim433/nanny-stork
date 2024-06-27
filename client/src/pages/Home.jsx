import { Button } from "@material-tailwind/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
export default function Home() {
  return (
    <>
      <div className="page-container flex flex-col min-h-screen ">
        <div className="baby-quote-container w-full bg-pink-200 flex items-center justify-center mb-11 mt-5 py-20">
          <div className="baby-quote max-w-xl text-center">
            <p className="baby-quote-text text-xl font-semibold text-white">
              "Waah I'm a baby. And I be cryin and shit" - Lee Wheeler: 13/05/2001
            </p>
          </div>
        </div>
        <div className="info-allignment flex justify-center">
          <div className="info-container w-2/3 flex flex-row justify-between items-stretch h-[400px] gap-24 mb-6">
            <div className="info-box bg-white shadow-md rounded-lg p-4 flex-1">
              <p className="info-text text-center text-md font-medium">Blog</p>
            </div>
            <div className="info-box bg-white shadow-md rounded-lg p-4 flex-1">
              <p className="info-text text-center text-md font-medium text-gray-800">AI</p>
            </div>
          </div>
        </div>
        <div className="btn-allignment flex justify-center">
          <div className="flex flex-none items-center justify-center w-[100px]">
            <Button style={{ backgroundColor: '#F59191' }}>
              Get Started
            </Button>
          </div>
        </div>  
        <Footer />
      </div>
    </>
  );
}