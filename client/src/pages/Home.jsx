import { Button } from "@material-tailwind/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import { Link } from 'react-router-dom';

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
        <div className="info-allignment flex justify-center gap-12">
            <InfoCard
            imageURL="images/stork-playing.png"
            title="An AI Companion For New Parents"
            description="Our AI model is here for you around the clock. Built with those tough times in mind when everyone's phone is off and you just can't seem to find the answer you desire, your personal nanny will be here to deliver the best of advice "
            btnText="Chat Now"/>
            <InfoCard
            imageURL="images/mothers.webp"
            imgClass="object-fit h-full scale-150 translate-y-9 translate-x-2"
            title="For Mothers And Mothers To Be"
            description="Join a community of mothers and keep in touch throughout pregnancy and post-partum. Browse the various blog posts to keep up to date on pregnancy tips and health advice post birth."
            btnText="Broswe Posts"
            />
        </div>  

        <button>  {/* temporary button to take me to the posts page */}
          <Link to={`/posts`} > POSTS PAGE</Link>
        </button>

        <Footer />
      </div>
    </>
  );
}