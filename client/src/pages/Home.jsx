import { Button } from "@material-tailwind/react";

export default function Home() {

  return (
    <>
      <div className="page-container flex flex-col min-h-screen">
        <div className="baby-quote-container w-full h-1/4 bg-pink-200 flex items-center justify-center mb-11">
          <div className="baby-quote">
            <p className="baby-quote-text">
              Waah Im a baby
            </p>
          </div>
        </div>
        <div className="info-container flex flex-row">
          <div className="info-box">
            <p className="info-text">blog</p>
          </div>
          <Button>Get Started</Button>
          <div className="info-box">
            <p className="info-text">ai</p>
          </div>
        </div>
      </div>
    </>
  )
}