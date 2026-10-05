import {
  useEffect,
  useState
} from "react";


// ============================================================
// GET CURRENT URL (HASH BASED, WORKS ON GITHUB PAGES)
// "#/shop?gender=men"  ->  "/shop?gender=men"
// ============================================================

function getCurrentURL() {

  return (
    window.location.hash.slice(1) || "/"
  );

}


// ============================================================
// NAVIGATION
// ============================================================

export const navigateTo = (path) => {

  window.location.hash = path;


  // Instant scroll to top
  window.scrollTo(
    0,
    0
  );

};


// ============================================================
// USE NAVIGATE
// ============================================================

export const useNavigate = () => {

  return navigateTo;

};


// ============================================================
// LINK COMPONENT
// ============================================================

export function Link({
  to,
  children,
  className = "",
  onClick,
  ...rest
}) {

  function handleClick(e) {

    e.preventDefault();


    if (onClick) {

      onClick(e);

    }


    navigateTo(to);

  }


  return (

    <a
      href={"#" + to}
      className={className}
      onClick={handleClick}
      {...rest}
    >

      {children}

    </a>

  );

}


// ============================================================
// USE PATH
// ============================================================

export function usePath() {

  const [
    path,
    setPath
  ] = useState(
    getCurrentURL()
  );


  useEffect(() => {

    function handleNavigation() {

      setPath(
        getCurrentURL()
      );

    }


    window.addEventListener(
      "hashchange",
      handleNavigation
    );

    window.addEventListener(
      "popstate",
      handleNavigation
    );


    return () => {

      window.removeEventListener(
        "hashchange",
        handleNavigation
      );

      window.removeEventListener(
        "popstate",
        handleNavigation
      );

    };

  }, []);


  return path;

}