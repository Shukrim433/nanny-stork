import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function index({ post }) {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56"></CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {post.postAuthor}
        </Typography>
        <Typography>{post.postText}</Typography>
      </CardBody>
      <CardFooter className="pt-0"></CardFooter>
    </Card>
  );
}

export default index;
