export default function CustomerVideoReviews() {
  const videos = [
    "/videos/review1.mp4",
    "/videos/review2.mp4",
    "/videos/review3.mp4",
    "/videos/review4.mp4",
    "/videos/review5.mp4",
  ];

  return (
    <section className="customer-video-reviews">

      <div className="customer-video-header">
        <p className="video-review-label">
          CUSTOMER STORIES
        </p>

        <h2>
          WHAT OUR CUSTOMERS SAY
        </h2>

        <p className="video-review-subtitle">
          Real people. Real style. Real experiences.
        </p>
      </div>

      <div className="video-reviews-grid">

        {videos.map((video, index) => (
          <div
            className="video-review-card"
            key={index}
          >
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
              tabIndex="-1"
            />
          </div>
        ))}

      </div>

    </section>
  );
}