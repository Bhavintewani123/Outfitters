import {
  Link
} from "../components/RouterLink";


const data = [

  {
    title:
      "THE WOMEN'S EDIT",

    description:
      "Soft silhouettes, clean lines and everyday pieces designed for your wardrobe.",

    category:
      "Dresses",

    gender:
      "Women",

    image:
      "/images/products/women/dresses/women_dresses_01.jpg"
  },


  {
    title:
      "THE MEN'S EDIT",

    description:
      "Relaxed essentials, modern tailoring and everyday pieces for him.",

    category:
      "Shirts",

    gender:
      "Men",

    image:
      "/images/products/men/shirts/men_shirts_01.jpg"
  },


  {
    title:
      "THE DENIM EDIT",

    description:
      "From classic straight fits to relaxed silhouettes, discover everyday denim.",

    category:
      "Jeans",

    gender:
      "Women",

    image:
      "/images/products/women/jeans/women_jeans_01.jpg"
  }

];


export default function Collections() {

  return (

    <main className="collection-page">


      {/* =====================================================
          COLLECTION INTRO
      ===================================================== */}

      <div className="collection-intro">

        <span className="eyebrow">
          CURATED BY MOOD
        </span>

        <h1>
          Collections
        </h1>

        <p>
          Three ways to build a wardrobe
          that still feels like you.
        </p>

      </div>


      {/* =====================================================
          COLLECTION GRID
      ===================================================== */}

      <div className="collection-grid">

        {data.map(
          collection => (

            <Link
              key={
                collection.title
              }

              to={
                `/shop?gender=${
                  collection.gender
                }&category=${
                  encodeURIComponent(
                    collection.category
                  )
                }`
              }

              className="collection-card"
            >

              {/* IMAGE */}

              <div className="collection-image">

                <img
                  src={
                    collection.image
                  }

                  alt={
                    collection.title
                  }

                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />

              </div>


              {/* CONTENT */}

              <div className="collection-content">

                <span>
                  SHOP COLLECTION
                </span>

                <h2>
                  {collection.title}
                </h2>

                <p>
                  {
                    collection.description
                  }
                </p>

                <div className="collection-link">
                  EXPLORE COLLECTION →
                </div>

              </div>

            </Link>

          )
        )}

      </div>

    </main>

  );

}