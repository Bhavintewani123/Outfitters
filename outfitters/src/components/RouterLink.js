import {
  useEffect,
  useState
} from "react";


// ============================================================
// GET CURRENT URL
// ============================================================

function getCurrentURL() {

  return (
    window.location.pathname +
    window.location.search
  );

}


// ============================================================
// NAVIGATION
// ============================================================

export const navigateTo = (path) => {

  window.history.pushState(
    {},
    "",
    path
  );


  window.dispatchEvent(
    new PopStateEvent(
      "popstate"
    )
  );


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
      href={to}
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
      "popstate",
      handleNavigation
    );


    return () => {

      window.removeEventListener(
        "popstate",
        handleNavigation
      );

    };

  }, []);


  return path;

}