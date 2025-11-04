import { GrainyBackground } from "./components/ui/GrainyBackground";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useState } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Footer from "./components/Footer";
import WaterSection from "./components/Water";
import { getPartners, Partner } from "./utils/api/partnerService";
import { Feature, getFeatures } from "./utils/api/featureService";
import { getMenus, Menu } from "./utils/api/menuService";
import { getProjects, Project } from "./utils/api/projectService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPosts, Post } from "./utils/api/postService";
import Slider from "react-slick";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  draggable: false,
  pauseOnHover: false,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};
const settingsRtl = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  draggable: false,
  pauseOnHover: false,
  rtl: true,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

function App() {
  const [responseFeatures, setFeatures] = useState<Feature[]>([]);
  const [responsePartners, setPartners] = useState<Partner[]>([]);
  const [responseProjects, setProjects] = useState<Project[]>([]);
  const [responsePosts, setPosts] = useState<Post[]>([]);
  const [responseMenus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const features = await getFeatures();
      setFeatures(features);
      const partners = await getPartners();
      setPartners(partners);
      const projects = await getProjects();
      setProjects(projects);
      const post = await getPosts();
      setPosts(post);

      const responseMenu = await getMenus();
      setMenus(responseMenu);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenis.on("scroll", ScrollTrigger.update);

    // Create a RAF loop to update Lenis
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const offerArray = gsap.utils.toArray("#offer-list .content");
    if (loading || offerArray.length === 0 || responseFeatures.length === 0)
      return;

    gsap.to(offerArray, {
      xPercent: -100 * (offerArray.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#offer-section",
        start: "top top",
        // end: "+=3000",
        pin: true,
        scrub: 0.8,
        snap: 1 / (offerArray.length - 1),
      },
    });
  }, [loading]);

  useGSAP(() => {
    gsap.fromTo(
      "#company-logo",
      {
        scale: 4,
      },
      {
        scale: 1,
        x: "0%",
        duration: 2,
        ease: "power1.in",
        scrollTrigger: {
          trigger: "#navbar",
          start: "-150% top",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      "#company-logo-mbl",
      {
        scale: 4,
        x: "-50%",
        left: "50%",
      },
      {
        scale: 1,
        left: "0",
        x: "0%",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#company-logo-mbl",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    gsap.utils.toArray(".dark").forEach((el) => {
      gsap.to(
        "#fixed-nav",

        {
          color: "white",
          scrollTrigger: {
            // @ts-expect-error trigger element
            trigger: el,
            start: "top top", // Start animation when the top of the logo reaches the bottom of the viewport
            scrub: true, // Smooth scrubbing effect
          },
        }
      );
    });

    gsap.utils.toArray(".light").forEach((el) => {
      gsap.to("#fixed-nav", {
        color: "black",
        scrollTrigger: {
          // @ts-expect-error trigger element
          trigger: el,
          start: "top top", // Start animation when the top of the logo reaches the bottom of the viewport
          scrub: true, // Smooth scrubbing effect
        },
      });
    });

    gsap.fromTo(
      "#hero-tagline",
      { opacity: 1 },
      {
        opacity: 0,
        delay: 1,
        scrollTrigger: {
          trigger: "#hero-tagline",
          start: "-100% top",
          end: "top top",
          scrub: true,
        },
      }
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#tag-section",
          start: "top center",
          end: "top 40%",
          scrub: 0.5,
        },
      })
      .fromTo(
        "#tag-section-content",
        {
          y: "100%",
        },
        {
          y: "0",
          scale: 1,
          duration: 5,
          ease: "power1.in",
        }
      );

    gsap.fromTo(
      "#about-background",
      {
        width: "32px",
        height: "32px",
        borderRadius: "500% 500% 0% 0%;",
      },
      {
        width: "100vw",
        height: "100vh",
        borderRadius: "0% 0% 0% 0%;",
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
          // markers: true,
        },
      }
    );

    gsap.fromTo(
      "#about-content",
      {
        scale: 0,
      },
      {
        scale: 1,
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
          // markers: true,
        },
      }
    );
  });

  useEffect(() => {
    const buttons = document.querySelectorAll("button.nav-menuBtn");
    const buttonsClosed = document.querySelectorAll("button.nav-menuBtnClose");
    const overlayClosed = document.querySelectorAll("div.overlay");

    const openDrawer = () => {
      document.getElementById("drawer")?.classList.add("open");
      document.getElementById("overlay")?.classList.add("show");
    };

    const closeDrawer = () => {
      document.getElementById("drawer")?.classList.remove("open");
      document.getElementById("overlay")?.classList.remove("show");
    };

    buttons.forEach((button) => button.addEventListener("click", openDrawer));
    buttonsClosed.forEach((button) =>
      button.addEventListener("click", closeDrawer)
    );
    overlayClosed.forEach((button) =>
      button.addEventListener("click", closeDrawer)
    );

    return () => {
      buttons.forEach((button) =>
        button.removeEventListener("click", openDrawer)
      );
      buttonsClosed.forEach((button) =>
        button.removeEventListener("click", closeDrawer)
      );
      overlayClosed.forEach((button) =>
        button.removeEventListener("click", closeDrawer)
      );
    };
  }, []);

  return (
    <div className="relative">
      <GrainyBackground>
        <div
          id="fixed-nav"
          className="fixed top-0 left-0 z-999 right-0 px-4 md:px-6 py-4 md:py-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end items-center">
              <button
                id="nav-menuBtn"
                className="nav-menuBtn md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
              >
                <span className="w-full h-0.5 border"></span>
                <span className="w-full h-0.5 border"></span>
                <span className="w-full h-0.5 border"></span>
              </button>
              <div id="overlay" className="overlay"></div>
              <div id="drawer" className="drawer">
                <button className="nav-menuBtnClose">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#1C274C"
                      strokeWidth="1"
                    ></circle>
                    <path
                      d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
                <div className="space-y-4 text-xl mt-16 flex flex-col">
                  {responseMenus.map((el, index) => (
                    <a
                      key={index}
                      className="menu hover:text-gray-300 hover:-skew-x-12 hover:scale-110"
                      href={el.url}
                    >
                      {el.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div
              id="nav-menus"
              className="flex-1 hidden md:flex items-center gap-4 md:gap-8 justify-end"
            >
              {responseMenus.map((el, index) => (
                <a
                  key={index}
                  className="menu hover:text-gray-300 hover:-skew-x-12 hover:scale-110"
                  href={el.url}
                >
                  {el.label}
                </a>
              ))}
              {/* <a
                href="#work"
                className="menu hover:text-gray-300 hover:-skew-x-12 hover:scale-110"
              >
                About Us
              </a>
              <a
                href="#about"
                className="menu hover:text-gray-300 hover:-skew-x-12 hover:scale-110"
              >
                Listings
              </a>
              <a
                href="#contact"
                className="menu hover:text-gray-300 hover:-skew-x-12 hover:scale-110"
              >
                Contact
              </a> */}
            </div>
          </div>
        </div>
        <div className="h-[35vh]"></div>

        <nav
          id="navbar"
          className="sticky top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-8"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center relative">
            <div className="flex-1 hidden md:block"></div>
            <div className="flex-1 flex md:justify-center">
              <a
                id="company-logo"
                href="/"
                className="hidden md:block text-xl md:text-2xl font-medium scale-500"
              >
                <img
                  src={`${
                    import.meta.env.VITE_STATIC_FILE
                  }/Bi7T037PrUaprig4RTNA7A_lv_homes_logo_03.png`}
                  alt=""
                  className="w-16 h-16"
                />
              </a>
              <a
                id="company-logo-mbl"
                href="/"
                className="absolute top-0 left-1/2 md:hidden text-xl md:text-2xl font-medium scale-500"
              >
                <img
                  src={`${
                    import.meta.env.VITE_STATIC_FILE
                  }/Bi7T037PrUaprig4RTNA7A_lv_homes_logo_03.png`}
                  alt=""
                  className="w-16 h-16"
                />
              </a>
            </div>
            <div className="flex-1 hidden md:flex"></div>
            <div className="md:hidden flex-1 flex justify-end"></div>
          </div>
        </nav>
        <div
          id="hero-tagline"
          className="dark px-4 md:px-6 py-4 md:py-8 mt-32 md:mt-16 md:space-y-3"
        >
          <div className="max-w-7xl mx-auto font-semibold text-2xl md:text-5xl text-center">
            Discover Luxury Living
          </div>
          <div className="max-w-7xl mx-auto text-lg md:text-3xl text-center font-nunito">
            Where dreams become <span className="font-nyght">reality</span>
          </div>
          <div className="flex justify-center mt-5">
            <a href="/dubai">
              <button className="h-16 w-48 border">Explore</button>
            </a>
          </div>
        </div>

        <section id="tag-section">
          <div
            id="tag-section-content"
            className="max-w-7xl mx-auto text-center py-16"
          >
            <div className="font-thin text-[4em]/20 md:text-[8em]/40 font-bold m-0 p-0">
              Your
            </div>
            <div className="font-thin text-[4em]/20 md:text-[8em]/40 font-bold m-0 p-0">
              Partner in
            </div>
            <div className="font-thin italic text-[6em]/20 md:text-[12.08em]/40 font-bold m-0 p-0">
              Dubai
            </div>
            <div className="font-thin text-[4em]/20 md:text-[8em]/40 font-bold m-0 p-0">
              Real Estate
            </div>
          </div>
        </section>
        <section id="about-section" className="h-[200vh] hidden md:block">
          <div className="h-screen relative">
            <div className="h-full"></div>
            <div className=" sticky bottom-0 right-0 left-0 flex justify-center">
              <div
                id="about-background"
                className="w-32 h-32 rounded-t-full bg-black overflow-hidden"
              >
                <img
                  src={`${
                    import.meta.env.VITE_STATIC_FILE
                  }/bkNRtckrQkepp6MsciNuTg_background.jpg`}
                  alt=""
                  srcSet=""
                  sizes="100vw"
                  className=" w-screen h-screen object-cover"
                />
              </div>
              <div
                id="about-content"
                className="font-nyght absolute top-0 text-5xl px-16 w-screen h-screen  flex items-center justify-center bg-gradient-to-t from-black from-[5%] to-transparent to-[90%]"
              >
                " At Lux Veritas Homes, we believe in crafting homes that blend
                elegance with integrity. Our mission is to bring light and truth
                into every space we design, creating lasting value and comfort
                for every homeowner.
              </div>
            </div>
          </div>
        </section>
        <section id="about-section-mbl" className="md:hidden">
          <div className="flex justify-center items-center h-screen bg-black relative">
            <img
              src={`${
                import.meta.env.VITE_STATIC_FILE
              }/bkNRtckrQkepp6MsciNuTg_background.jpg`}
              alt=""
              srcSet=""
              sizes="100vw"
              className=" w-screen h-screen object-cover"
            />
            <div className=" absolute top-1/2 z-20 right-0 left-0 font-nyght text-3xl px-16 -translate-y-[50%]">
              " At Lux Veritas Homes, we believe in crafting homes that blend
              elegance with integrity. Our mission is to bring light and truth
              into every space we design, creating lasting value and comfort for
              every homeowner. "
            </div>
            <div className="absolute top-0 z-10 size-full bg-gradient-to-t from-black/90 from-[5%] to-transparent "></div>
          </div>
        </section>

        <section id="offer-section">
          <div className="light min-h-screen bg-white overflow-hidden">
            <div className="text-gray-900 pt-16 space-y-16">
              <p className="text-center md:text-left md:px-32 text-5xl md:text-7xl">
                What We Offer
              </p>
              <div
                id="offer-list"
                className="max-w-7xl mx-auto min-h-150 flex flex-nowrap overflow-hidden"
              >
                {/* {[1, 2, 3, 4].map((_el, i) => (
                  <div
                    key={i}
                    className={`content relative max-w-7xl min-h-150 min-w-[100%] flex w-full flex-col md:flex-row ${
                      i % 2 ? "flex-col-reverse" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="grow w-full p-8">
                      <img
                        src=""
                        alt=""
                        className="size-full object-cover bg-gray-100"
                      />
                    </div>
                    <div className="min-w-[40%]">
                      <div
                        className={`w-full p-8 flex flex-col justify-center bg-white/90 ${
                          i % 2 && "flex-col-reverse"
                        }
                        md:absolute md:top-1/2 md:max-w-[50%] md:-translate-y-[50%]
                        ${i % 2 && "md:right-0"}
                        `}
                      >
                        <div className="text-2xl md:text-7xl font-semibold">
                          Lorem ipsum dolor sit, amet consectetur
                        </div>
                        <div>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Atque fuga rem suscipit cupiditate quisquam
                          pariatur delectus quod adipisci corporis quae placeat
                          aliquid voluptas, accusantium aspernatur animi!
                          Temporibus consequuntur totam suscipit.
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
                {responseFeatures.map((el, i) => (
                  <div
                    key={i}
                    className={`content relative max-w-7xl min-h-150 min-w-[100%] flex w-full flex-col md:flex-row ${
                      i % 2 ? "flex-col-reverse" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="grow w-full p-8">
                      <img
                        src={`${import.meta.env.VITE_STATIC_FILE}/${el.image}`}
                        alt=""
                        className="size-full object-cover bg-gray-100"
                      />
                    </div>
                    <div className="min-w-[40%]">
                      <div
                        className={`w-full p-8 flex flex-col justify-center bg-white/90 ${
                          i % 2 && "flex-col-reverse"
                        }
                        md:absolute md:top-1/2 md:max-w-[50%] md:-translate-y-[50%]
                        ${i % 2 && "md:right-0"}
                        `}
                      >
                        <div className="text-2xl md:text-7xl font-semibold">
                          {el.title}
                        </div>
                        <div>{el.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="featured-section" className="">
          <div className="min-h-screen bg-white text-gray-900 space-y-16">
            <p className="text-center md:text-right md:px-32 text-5xl md:text-7xl">
              Featured Project
            </p>
            <div className="flex flex-wrap max-w-7xl mx-auto gap-x-8 justify-center items-center p-4 gap-y-8 pb-16">
              {responseProjects.map((el, i) => (
                <div
                  key={i}
                  className="min-w-[100%] md:min-w-[30%] flex-1 flex flex-col flex-nowrap"
                >
                  <a href={`${import.meta.env.VITE_ROUTE}${el.routePath}`}>
                    <div className="w-full h-full">
                      <img
                        src={`${import.meta.env.VITE_STATIC_FILE}/${
                          el.main_image
                        }`}
                        alt=""
                        className="w-full grow bg-gray-300 rounded-xl hover:-skew-3 h-96 w-96 object-cover"
                      />
                    </div>
                  </a>
                  <div className="p-4 text-xl">{el.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaterSection />
        <section
          id="partner-section"
          className="w-screen overflow-hidden bg-white py-8 text-gray-900"
        >
          <div className="flex flex-col justify-center items-center">
            <p className="text-5xl md:text-7xl">Partners</p>
            <div className="container">
              <Slider {...settings} className="w-[95vw] mx-auto">
                {responsePartners.map((el, index) => (
                  <div
                    key={index}
                    className="  flex justify-center items-center"
                  >
                    <img
                      src={`${import.meta.env.VITE_STATIC_FILE}/${el.logo}`}
                      alt=""
                      srcSet=""
                      className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="container">
              <Slider {...settingsRtl} className="w-[95vw] mx-auto">
                {responsePartners.map((el, index) => (
                  <div
                    key={index}
                    className="  flex justify-center items-center"
                  >
                    <img
                      src={`${import.meta.env.VITE_STATIC_FILE}/${el.logo}`}
                      alt=""
                      srcSet=""
                      className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
        <WaterSection reverse={true} />

        <section id="blog-section">
          <div className="min-h-screen bg-white text-gray-900 space-y-16 py-16">
            <p className="text-center md:text-left md:px-32 text-5xl md:text-7xl">
              Blogs
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-7xl mx-auto p-4">
              {responsePosts.map((el, i) => (
                <div
                  key={i}
                  className="min-w-[100%] md:min-w-[30%] min-h-96 flex-1 flex flex-col flex-nowrap"
                >
                  <div className="w-full">
                    <a href={`${import.meta.env.VITE_ROUTE}${el.routePath}`}>
                      <img
                        src={`${import.meta.env.VITE_STATIC_FILE}/${
                          el.featured_image
                        }`}
                        alt=""
                        className="w-full grow bg-gray-300 rounded-xl min-h-64"
                      />
                    </a>
                  </div>
                  <div className="p-4 text-xl">{el.title}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <a href="/posts" className="">
                <button className="shadow-lg px-16 py-2 rounded-full border-gray-50">
                  Read More
                </button>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-black/50">
          <Footer />
        </section>
      </GrainyBackground>
    </div>
  );
}

export default App;
