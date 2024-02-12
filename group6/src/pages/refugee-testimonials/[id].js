// pages/testimonial/[id].js
import { useRouter } from 'next/router';

const TestimonialPage = () => {
  const router = useRouter();
  const { id } = router.query; // Accessing the dynamic part of the URL

  return (
    <div>
      <div>
        <h1></h1>
      </div>
    </div>
  );
};

export default TestimonialPage;
