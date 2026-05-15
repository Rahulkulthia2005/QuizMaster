import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* LEFT */}
      <div className="footer-left">

        <h2 className="footer-logo">
          Quiz<span>Master</span>
        </h2>

        <p>
          The smart way to create, share and take quizzes.
          <br />
          Learn. Compete. Grow.
        </p>

      </div>

      {/* CENTER */}
      <div className="footer-center">

        <h3>Contact Us</h3>

        <p>support@quizmaster.com</p>
        <p>+91 9876543210</p>
        <p>India</p>

      </div>

      {/* RIGHT */}
      <div className="footer-right">

        <h3>Follow Us</h3>

        <div className="social-icons">

          <a href="/">
            <i className="fab fa-facebook-f"></i>
          </a>

          <a href="/">
            <i className="fab fa-twitter"></i>
          </a>

          <a href="/">
            <i className="fab fa-instagram"></i>
          </a>

          <a href="/">
            <i className="fab fa-linkedin-in"></i>
          </a>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © 2026 QuizMaster. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;