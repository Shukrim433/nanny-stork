import { Button } from "@material-tailwind/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
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
            <InfoCard
            imageURL="images/stork-playing.png"/>
            <InfoCard/>
        </div>  
        <Footer />
      </div>
    </>
  );
}