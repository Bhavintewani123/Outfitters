function AnnouncementBar() {
  const content = (
    <>
      <span>FREE SHIPPING ON ORDERS ABOVE ₹999</span>
      <b>✦</b>
      <span>NEW DROP EVERY WEEK</span>
      <b>✦</b>
      <span>WEAR YOUR OWN STORY</span>
      <b>✦</b>
    </>
  );

  return (
    <div className="announcement-bar">
      <div className="announcement-track">

        <div className="announcement-content">{content}</div>
        <div className="announcement-content">{content}</div>
        <div className="announcement-content">{content}</div>
        <div className="announcement-content">{content}</div>
        <div className="announcement-content">{content}</div>
        <div className="announcement-content">{content}</div>

      </div>
    </div>
  );
}

export default AnnouncementBar;