import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export default function InfoCard({ imageURL, title, description, btnText }) {
    return (
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={imageURL}
            alt="card-image"
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
          <Button>{btnText}</Button>
        </CardFooter>
      </Card>
    );
  }