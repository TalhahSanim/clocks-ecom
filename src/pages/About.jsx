import styles from "./About.module.css";

const About = () => {
  return (
    <>
      {/* <title>About | Parralel Clocks</title> */}
      <div>
        {/* <h1 className={styles.title}>About | Parralel Store</h1> */}
        <p className={styles.intro}>Welcome to About Page</p>
        <p className={styles.introText}>
          Parallel Clocks began with a simple belief: a good clock does more
          than tell the time, it sets the mood of a room. What started as a
          small workshop restoring antique mantel clocks has grown into an
          online store bringing timepieces to homes across Australia. Our
          range runs from hand-finished oak wall clocks and brass mantel
          pieces to retro alarm clocks, pocket watches and hourglasses, each
          one chosen for its craftsmanship, character and reliability. Every
          clock is inspected and tested before it leaves our warehouse, and
          every order is backed by a 12-month warranty and free returns
          within 30 days. Whether you are furnishing a new home, hunting for
          the perfect gift or adding to a collection, our team is here to help
          you find a piece that keeps perfect time for years to come.
          <figure className={styles.imageWrap}>
            <img
              className={styles.aboutImage}
              src="https://images.unsplash.com/photo-1763960091036-813259b59775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Close up of an antique grandfather clock face"
            />
            <figcaption className={styles.credit}>
              Photo by{" "}
              <a href="https://unsplash.com/@mazicc?utm_source=parralel_clocks&utm_medium=referral">
                Nguyen Mazic
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/?utm_source=parralel_clocks&utm_medium=referral">
                Unsplash
              </a>
            </figcaption>
          </figure>
        </p>
      </div>
    </>
  );
};
export default About;
