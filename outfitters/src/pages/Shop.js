import {
  useMemo,
  useState,
  useEffect
} from "react";

import {
  products,
  womenCategories,
  menCategories
} from "../data/products";

import ProductCard from "../components/ProductCard";

import { navigateTo } from "../components/RouterLink";


// ============================================================
// SHOP PAGE
// ============================================================

export default function Shop({
  mode = "all",
  gender: propGender = null,
  category: propCategory = null
}) {

  // ============================================================
  // GET URL VALUES
  // ============================================================

  function getURLValues() {

    const params = new URLSearchParams(
      window.location.search
    );

    return {
      gender:
        propGender ||
        params.get("gender") ||
        "All",

      category:
        propCategory ||
        params.get("category") ||
        "All"
    };
  }


  // ============================================================
  // INITIAL VALUES
  // ============================================================

  const initialValues = getURLValues();


  // ============================================================
  // STATE
  // ============================================================

  const [gender, setGender] = useState(
    initialValues.gender
  );

  const [category, setCategory] = useState(
    initialValues.category
  );

  const [sort, setSort] = useState(
    "featured"
  );


  // ============================================================
  // SYNC WITH URL
  // ============================================================

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const newGender =
      propGender ||
      params.get("gender") ||
      "All";

    const newCategory =
      propCategory ||
      params.get("category") ||
      "All";

    setGender(newGender);
    setCategory(newCategory);

  }, [
    propGender,
    propCategory
  ]);


  // ============================================================
  // CATEGORY LIST
  // ============================================================

  const categoryList = useMemo(() => {

    if (gender === "Women") {
      return womenCategories;
    }

    if (gender === "Men") {
      return menCategories;
    }

    return [
      "All",
      ...new Set(
        products.map(
          product => product.category
        )
      )
    ];

  }, [gender]);


  // ============================================================
  // FILTER PRODUCTS
  // ============================================================

  const shown = useMemo(() => {

    let result = [...products];


    // ==========================================================
    // GENDER FILTER
    // ==========================================================

    if (gender !== "All") {

      result = result.filter(
        product =>
          product.gender === gender
      );

    }


    // ==========================================================
    // CATEGORY FILTER
    // ==========================================================

    if (category !== "All") {

      result = result.filter(
        product =>
          product.category === category
      );

    }


    // ==========================================================
    // NEW ARRIVALS
    // ==========================================================

    if (mode === "new") {

      result = result.filter(
        product =>
          product.badge === "NEW"
      );

    }


    // ==========================================================
    // BEST SELLERS
    // ==========================================================

    if (mode === "best") {

      result = result.filter(
        product =>
          product.badge === "BESTSELLER"
      );

    }


    // ==========================================================
    // SALE
    // ==========================================================

    if (mode === "sale") {

      result = result.filter(
        product =>
          product.oldPrice
      );

    }


    // ==========================================================
    // FEATURED
    // ==========================================================
    //
    // RANDOM ONLY WHEN CATEGORY = ALL
    //
    // ALL:
    // Shirt → Jeans → Shorts → Pants → Jacket → T-Shirt
    //
    // WOMEN + ALL:
    // Dress → Jeans → Tops → Skirt → Jacket → Pants
    //
    // MEN + ALL:
    // Shirt → Jeans → Shorts → Hoodie → Pants → Jacket
    //
    // SPECIFIC CATEGORY:
    // Original order remains unchanged.
    //
    // ==========================================================

    if (
      sort === "featured" &&
      category === "All"
    ) {

      result.sort(
        () => Math.random() - 0.5
      );

    }


    // ==========================================================
    // PRICE LOW TO HIGH
    // ==========================================================

    if (sort === "low") {

      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );

    }


    // ==========================================================
    // PRICE HIGH TO LOW
    // ==========================================================

    if (sort === "high") {

      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );

    }


    // ==========================================================
    // SORT BY NAME
    // ==========================================================

    if (sort === "name") {

      result.sort(
        (a, b) =>
          String(a.name).localeCompare(
            String(b.name)
          )
      );

    }


    return result;

  }, [
    gender,
    category,
    sort,
    mode
  ]);


  // ============================================================
  // PAGE TITLE
  // ============================================================

  let title = "Shop All";


  if (gender === "Women") {
    title = "Women's Collection";
  }


  if (gender === "Men") {
    title = "Men's Collection";
  }


  if (category !== "All") {
    title = category;
  }


  if (mode === "new") {
    title = "New Arrivals";
  }


  if (mode === "best") {
    title = "Best Sellers";
  }


  if (mode === "sale") {
    title = "Sale";
  }


  // ============================================================
  // CHANGE GENDER
  // ============================================================

  function changeGender(value) {

    setGender(value);

    setCategory("All");


    const query = new URLSearchParams();


    if (value !== "All") {

      query.set(
        "gender",
        value
      );

    }


    const queryString =
      query.toString();


    const url =
      queryString
        ? `/shop?${queryString}`
        : "/shop";


    navigateTo(url);

  }


  // ============================================================
  // CHANGE CATEGORY
  // ============================================================

  function changeCategory(value) {

    setCategory(value);


    const query = new URLSearchParams();


    if (gender !== "All") {

      query.set(
        "gender",
        gender
      );

    }


    if (value !== "All") {

      query.set(
        "category",
        value
      );

    }


    const queryString =
      query.toString();


    const url =
      queryString
        ? `/shop?${queryString}`
        : "/shop";


    navigateTo(url);

  }


  // ============================================================
  // RENDER
  // ============================================================

  return (

    <main className="listing-page container">


      {/* ======================================================
          SHOP HEADER
      ====================================================== */}

      <div className="listing-head">

        <div>

          <span className="eyebrow">
            OUTFITTERS
          </span>

          <h1>
            {title}
          </h1>

          <p>
            {shown.length} pieces
          </p>

        </div>


        {/* ====================================================
            SORT
        ==================================================== */}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="featured">
            Sort: Featured
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>

          <option value="name">
            Name
          </option>

        </select>

      </div>


      {/* ======================================================
          GENDER TABS
      ====================================================== */}

      <div className="gender-tabs">

        <button
          className={
            gender === "All"
              ? "active"
              : ""
          }
          onClick={() =>
            changeGender("All")
          }
        >
          ALL
        </button>


        <button
          className={
            gender === "Women"
              ? "active"
              : ""
          }
          onClick={() =>
            changeGender("Women")
          }
        >
          WOMEN
        </button>


        <button
          className={
            gender === "Men"
              ? "active"
              : ""
          }
          onClick={() =>
            changeGender("Men")
          }
        >
          MEN
        </button>

      </div>


      {/* ======================================================
          CATEGORY FILTERS
      ====================================================== */}

      <div className="filter-row">

        {categoryList.map(
          (item) => (

            <button
              key={item}
              className={
                category === item
                  ? "active"
                  : ""
              }
              onClick={() =>
                changeCategory(item)
              }
            >
              {item}
            </button>

          )
        )}

      </div>


      {/* ======================================================
          PRODUCTS
      ====================================================== */}

      {shown.length > 0 ? (

        <div className="product-grid product-grid-large">

          {shown.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

        </div>

      ) : (

        <div className="empty-products">

          <h2>
            No products found
          </h2>

          <p>
            Try another category.
          </p>

        </div>

      )}

    </main>

  );

}