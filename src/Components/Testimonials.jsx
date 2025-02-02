import "../Styles/Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      name: "John Doe",
      feedback: "The doctors here are incredibly professional and compassionate. I couldn't be happier with the care I received!",
    },
    {
      name: "Sarah Khan",
      feedback: "Booking an appointment was so easy, and the entire process was seamless. Highly recommend this platform!",
    },
    {
      name: "Rajiv Sharma",
      feedback: "Thanks to this service, I was able to consult a specialist quickly and effectively. A lifesaver!",
    },
  ];

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">What Our Patients Say</h2>
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p className="review-feedback">&#34;{review.feedback}&#34;</p>
            <p className="review-author">- {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
