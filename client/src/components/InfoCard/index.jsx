import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { Link } from 'react-router-dom';
   
  export default function InfoCard({ imageURL, title, description, btnText, imgClass }) {
    return (
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={imageURL}
            alt="card-image"
            className={imgClass}
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <Typography>
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link to="/signUp">
          <Button>{btnText}</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }