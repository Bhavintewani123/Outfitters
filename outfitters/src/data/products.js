// ============================================================
// OUTFITTERS - PRODUCT DATABASE
// 320 LOCAL PRODUCTS
// ============================================================

const womenProductNames = {

  Dresses: [
    "Floral Print Wrap Maxi Dress",
    "Black Sequin Spaghetti Strap Evening Dress",
    "Off-Shoulder Plum Bodycon Dress",
    "Light Blue Plunging Slit Maxi Dress",
    "Flowy Red Halter Maxi Dress",
    "Navy Floral Flutter Sleeve Mini Dress",
    "Red Floral Belted Midi Dress",
    "White Off-Shoulder Mini Dress",
    "Black Sequin One-Shoulder Mini Dress",
    "Red Asymmetrical Drape Mini Dress",
    "Black Long Sleeve Tiered Maxi Dress",
    "Bright Green Printed African Maxi Dress",
    "Teal One-Shoulder Slit Maxi Dress",
    "Pink Long Sleeve Satin Midi Dress",
    "Multicolor Off-Shoulder Tiered Sundress",
    "Grey Embroidered Anarkali Dress",
    "Metallic Silver Strapless Evening Dress",
    "White Floral Short Sleeve Midi Dress",
    "Blue Patterned High-Neck Belted Maxi Dress",
    "Lilac Floral Off-Shoulder Tiered Maxi Dress",
  ],

  Tops: [
    "White Loose Asymmetrical Top",
    "White Strapless Peplum Top",
    "White Lace Crop Top",
    "White High-Neck Ruffled Top",
    "Burgundy Off-Shoulder Top",
    "Leopard Print Tube Top",
    "Brown Strapless Top",
    "Abstract Print Crop Top",
    "White Halter Cutout Top",
    "Black Wrap Crop Top",
    "Black Square-Neck Top",
    "Red Tie-Front Halter Top",
    "Dusty Blue Flutter Top",
    "Emerald Green Satin Top",
    "Orange Striped Knit Top",
    "Beige Printed Blouse Top",
    "Black One-Shoulder Knit Top",
    "White Strapless Mesh Top",
    "Patterned Tank Top",
    "Emerald Green Puff-Sleeve Top",
  ],

  Shirts: [
    "Black & White Vertical Striped Long-Sleeve Shirt",
    "Blue & Purple Striped Long-Sleeve Shirt",
    "Hot Pink Long-Sleeve Button-Down Shirt",
    "White Classic Long-Sleeve Button-Down Shirt",
    "Black Short-Sleeve Front-Tie Shirt",
    "Light Blue Short-Sleeve Front-Tie Shirt",
    "Dark Blue Satin Long-Sleeve Shirt",
    "White Oversized Long-Sleeve Button-Down Shirt",
    "Brown Front-Tie Long-Sleeve Shirt",
    "Navy Blue Long-Sleeve Button-Down Shirt",
    "Bright Orange Long-Sleeve Button-Down Shirt",
    "Magenta Long-Sleeve Button-Down Shirt",
    "Red Solid Long-Sleeve Button-Down Shirt",
    "White Fitted Long-Sleeve Formal Shirt",
    "Light Pink Short-Sleeve Button-Down Shirt",
    "Olive Green Long-Sleeve Button-Down Shirt",
    "Multicolor Vertical Striped Long-Sleeve Shirt",
    "Mustard Yellow Short-Sleeve Button-Down Shirt",
    "Grey Vertical Pinstriped Formal Shirt",
    "Light Blue Cropped Long-Sleeve Utility Shirt",
  ],

  Jeans: [
    "Dark Blue Patchwork Slim Fit Jeans",
  "Bright Blue Straight Leg Jeans",
  "Medium Blue Wide Leg Drawstring Denim Pants",
  "Teal High-Waisted Slim Jeans",
  "Light Blue Skinny Jeans",
  "Grey Relaxed Cargo Jeans",
  "Light Blue Heavily Knee-Ripped Wide Leg Jeans",
  "Light Blue Wide Leg Jeans",
  "Light Blue Ripped Straight Jeans",
  "Grey Graphic Print Straight Leg Jeans",
  "Light Blue Knee-Ripped Jeans",
  "Medium Blue Cargo Wide Leg Jeans",
  "Dark Blue Baggy Wide Leg Jeans",
  "Bright Blue Straight Fit Jeans",
  "Medium Blue Straight Leg Jeans",
  "Dark Grey Straight Bootcut Jeans",
  "Blue Flare Wide Leg Jeans",
  "Medium Blue Wide Leg Jeans",
  "Light Blue Ripped Skinny Jeans",
  "Brown Low-Rise Bootcut Jeans"
  ],

  Pants: [
    "Dusty Pink Relaxed Fit Pants",
    "Green Palm Leaf Print Wide Leg Pants",
    "Floral Print Wide Leg Drawstring Pants",
    "Dark Grey Geometric Print Wide Leg Pants",
    "Dark Blue Denim Wide Leg Drawstring Pants",
    "Bright Yellow High-Waisted Wide Leg Pants",
    "Brown Ankle-Length Drawstring Pants",
    "Dusty Lavender Cropped Wide Leg Pants",
    "Tropical Floral Print Wide Leg Pants",
    "Yellow High-Waisted Tailored Pants",
    "Orange Abstract Printed Wide Leg Pants",
    "Sage Green Wide Leg Flowy Pants",
    "Multicolor Leaf Print Wide Leg Pants",
    "White Wide Leg Drawstring Pants",
    "Brown Relaxed Drawstring Pants",
    "Beige Textured Wide Leg Pants",
    "Black Tailored Wide Leg Suit Pants",
    "Black Fitted High-Waisted Pants",
    "Rust Orange Wide Leg Pleated Pants",
    "Beige Straight Leg Tailored Pants",
  ],

  Joggers: [
    "Light Grey Classic Drawstring Joggers",
    "Cream Cuffed Fit Joggers",
    "Vibrant Red Athletic Joggers",
    "Deep Purple Casual Cuffed Joggers",
    "Mint Green Drawstring Joggers",
    "Dusty Pink Front-Pocket Joggers",
    "Grey Side-Striped Active Joggers",
    "Off-White Utility Cargo Joggers",
    "Dusty Rose Cuffed Cargo Joggers",
    "Teal Blue Loose-Fit Drawstring Joggers",
    "Dark Grey Relaxed Graphic Joggers",
    "Magenta Fitted Zip Joggers",
    "Off-White Relaxed Drawstring Joggers",
    "Two-Tone Tan & Brown Utility Joggers",
    "Mustard Yellow Striped Athletic Joggers",
    "Bright Orange Side-Striped Joggers",
    "Magenta Side-Striped Active Joggers",
    "Black Fitted High-Waisted Active Joggers",
    "Black & Yellow Colorblock Active Joggers",
    "Black, Pink & White Colorblock Active Joggers",
  ],

  Jackets: [
    "Metallic Blue Leather Biker Jacket",
    "Black Leather Zip-Up Biker Jacket",
    "Black Leather Slim-Fit Zip Jacket",
    "Dark Grey Ribbed Leather Biker Jacket",
    "Tan Leather Peplum Zip Jacket",
    "Beige Cropped Wrap-Front Jacket",
    "Brown Leather Zip Moto Jacket",
    "Bright Purple Zip-Up Puffer Jacket",
    "Black Quilted Leather Zip Jacket",
    "Black Leather Moto Jacket with Sleeve Stripes",
    "Olive Green Fleece Zip-Up Jacket",
    "White Plush Sherpa Zip-Up Jacket",
    "Black Faux Leather Shearling Trimmed Jacket",
    "Dark Brown Teddy Plush Jacket",
    "Hot Pink Plush Faux Fur Jacket",
    "Medium Wash Cropped Denim Jacket",
    "Bright Pink Faux Fur Shaggy Jacket",
    "Light Gray Plush Faux Fur Jacket",
    "Medium Wash Denim Jacket with Sherpa Collar",
    "Dark Blue Printed Denim Trucker Jacket",
  ],

  Skirts: [
    "Black Flared Skater Mini Skirt",
    "Bright Floral Print Mini Skirt",
    "Floral Print A-Line Midi Skirt",
    "Hot Pink Fitted Mini Skirt",
    "White Distressed Denim Midi Skirt",
    "Black Patterned A-Line Mini Skirt",
    "Black Faux Leather A-Line Skirt",
    "Bright Orange High-Waisted Mini Skirt",
    "White Textured High-Waisted Pencil Skirt",
    "Dark Grey Pleated Mini Skirt",
    "Beige Tiered Ruffle Wrap Maxi Skirt",
    "Black Satin High-Waisted Maxi Skirt",
    "Rust Red Printed High-Slit Maxi Skirt",
    "Beige Flowy Satin Midi Skirt",
    "Black Button-Front Wrap Mini Skirt",
    "Grey Speckled Pattern A-Line Midi Skirt",
    "Dark Brown Ribbed Knit Midi Skirt",
    "Blue Striped A-Line Midi Skirt",
    "Black & White Printed Mini Skirt",
    "Light Blue Pleated Drop-Waist Mini Skirt",
  ]

};


// ============================================================
// MEN PRODUCT NAMES
// ============================================================

const productNames = {

  "T-Shirts": [
    "Beige Textured High-Neck Fullsleeve T-shirt",
    "Black Graphic Running T-shirt",
    "White Giraffe T-shirt",
    "Yellow Streetwear T-shirt",
    "White Printed T-shirt",
    "Red Solid Crew-Neck T-shirt",
    "White Oversized Colorblock T-shirt",
    "Black Typography T-shirt",
    "Black Skull Printed T-shirt",
    "Navy Blue Supreme T-shirt",
    "Black and Grey Striped T-shirt",
    "Beige Plain T-shirt",
    "Black Printed T-shirt",
    "Plum Oversized Drop-Shoulder T-shirt",
    "Black Oversized Plain T-shirt",
    "White Trendy T-shirt",
    "Colorblocked Long-Sleeve T-shirt",
    "Grey Printed Sweatshirt T-shirt",
    "Black High-Neck Turtleneck T-shirt",
    "Orange & Blue Tie-Dye Printed T-shirt"
  ],

  Shirts: [
    "Maroon Polka Dot Printed Shirt",
    "Purple Floral Short-Sleeve Shirt",
    "Olive Green Abstract Shirt",
    "Light Blue Formal Button-Down Shirt",
    "Brown Plaid Checked Casual Shirt",
    "Plain White Classic Cotton Shirt",
    "Black Typography Print Casual Shirt",
    "Light Blue Solid Casual Shirt",
    "Red & Black Plaid Flannel Shirt",
    "Red & White Vertical Striped Short-Sleeve Shirt",
    "Maroon Solid Formal Shirt",
    "Sage Green Printed Abstract Shirt",
    "Blue & White Vertical Striped Dress Shirt",
    "Black & White Abstract Printed Boyfriend Shirt",
    "Navy Blue Casual Button-Down Shirt",
    "Pastel Yellow Casual Linen-Look Shirt",
    "Grey Pinstriped Formal Shirt",
    "Maroon Solid Long-Sleeve Shirt",
    "Light Blue Textured Formal Shirt",
    "White & Black Checked Casual Shirt"
  ],

  Jeans: [
    "Light Blue Slim Distressed Jeans",
    "Medium Wash Slim Fit Jeans",
    "Dark Blue Distressed Denim Jeans",
    "Charcoal Grey Cargo Pants",
    "Light Wash Cargo Jeans",
    "White Slim Fit Trousers",
    "Black Patterned Textured Jeans",
    "Wide Leg Blue Cargo Jeans",
    "Blue Flame Printed Flare Jeans",
    "Light Blue Distressed Tapered Jeans",
    "Light Blue Track Stripe Jeans",
    "Light Blue Surgery Jeans",
    "Grey Graphic Embroidered Wide Leg Jeans",
    "Classic Light Blue Slim Fit Jeans",
    "Medium Wash Patchwork Ripped Jeans",
    "Light Blue Wide Leg Bootcut Jeans",
    "Dark Grey Straight Leg Cargo Pants",
    "Acid Wash Blue Straight Leg Jeans",
    "Light Blue Teddy Bear Patchwork Jeans",
    "Heavily Distressed Blue Denim Jeans"
  ],

  Pants: [
    "Black Slim Fit Formal Pants",
    "Mustard Yellow Wide Leg Pants",
    "Rust Orange Straight Leg Chino Pants",
    "White & Black Pinstriped Cropped Pants",
    "White Wide Leg Pleated Pants",
    "Dusty Purple Relaxed Fit Pants",
    "Teal Blue Slim Fit Dress Pants",
    "Dark Brown Wide Leg Formal Pants",
    "Olive Green Tailored Formal Pants",
    "Off-White Straight Pants",
    "Dark Brown Slim Fit Casual Pants",
    "Black Metallic Pinstriped Loose Pants",
    "Beige Slim Fit Pants",
    "Maroon Straight Leg Formal Pants",
    "Charcoal Grey Pleated Formal Pants",
    "Navy Blue Fitted Chino Pants",
    "Grey & White Plaid Checked Pants",
    "Crimson Red Straight Leg Dress Pants",
    "Dark Brown Ankle-Length Formal Pants",
    "Classic Black Tailored Formal Pants"
  ],

  Joggers: [
    "Black Typography Printed Joggers",
    "Light Grey Panel Tracksuit Joggers",
    "Black Gold Patterned Athletic Joggers",
    "Navy Blue Side-Striped Joggers",
    "Heather Grey Tapered Joggers",
    "Brown Oversized Fleece Joggers",
    "Mint Green Lounge Joggers",
    "Black Performance Running Joggers",
    "Dark Camo Printed Joggers",
    "Black Casual Cuffed Joggers",
    "Light Grey Oversized Fleece Joggers",
    "Tan Beige Cargo Joggers",
    "Muted Brown Fleece Cuffed Joggers",
    "Black Utility Pocket Cargo Joggers",
    "Navy Blue Performance Athletic Joggers",
    "Bright Yellow Side-Tape Joggers",
    "Light Blue Fitted Sweatshirt Joggers",
    "Black Straight-Leg Active Joggers",
    "Black Multi-Pocket Tactical Cargo Joggers",
    "Dusty Pink Wide-Leg Cuffed Joggers"
  ],

  Jackets: [
    "Tan Shearling Collar Bomber Jacket",
    "Plaid Flannel Sherpa Overshirt Jacket",
    "Black Quilted Zip-Up Puffer Jacket",
    "Black Biker Jacket with Shearling Trim",
    "Purple Lightweight Down Puffer Jacket",
    "Black Asymmetrical Leather Biker Jacket",
    "Black & White Colorblock Puffer Jacket",
    "Dark Brown Suede Button-Front Jacket",
    "Tan Brown Corduroy Trucker Jacket",
    "Chestnut Brown Leather Biker Jacket",
    "Dark Brown Fleece-Lined Overshirt Jacket",
    "Dark Brown Leather Shearling Jacket",
    "Tan Brown Suede Zip-Up Jacket",
    "Black Fitted Lightweight Zip Jacket",
    "Olive Green Utility Jacket with Animal Print Collar",
    "Cream & Red Graphic Motorsport Varsity Jacket",
    "Light Wash Distressed Denim Hooded Jacket",
    "Black Classic Denim Trucker Jacket",
    "Grey Denim Jacket with Shearling Trim",
    "Dark Wash Blue Ford Graphic Denim Jacket"
  ],

  Hoodies: [
    "Classic Black Hoodie",
    "Essential Grey Hoodie",
    "Navy Blue Relaxed Hoodie",
    "Vine Pullover Hoodie",
    "Yellow Oversized Street Hoodie",
    "Black Designer Hoodie",
    "Tidie White Hoodie",
    "Heavyweight Grey Hoodie",
    "Off-White Weekend Hoodie",
    "Premium Logo Black Hoodie",
    "Relaxed Fit Blue Hoodie",
    "Urban Essential Black Hoodie",
    "Beige Soft Fleece Hoodie",
    "Clean Black Hoodie",
    "White Everyday Comfort Hoodie",
    "Black Modern Oversized Hoodie",
    "Classic Red Hoodie",
    "Black Spider Hoodie",
    "Essential White Hoodie",
    "Lavender Premium Outlook Hoodie"
  ],

  Shorts: [
    "Terracotta Chino Shorts",
    "Charcoal Lounge Shorts",
    "Distressed Denim Shorts",
    "Dark Grey Active Shorts",
    "Striped Casual Shorts",
    "Orange Swim Shorts",
    "Navy Sports Shorts",
    "Light Blue Sweat Shorts",
    "Mint Green Casual Shorts",
    "Beige Sweat Shorts",
    "Berry Red Shorts",
    "Black Athletic Shorts",
    "Ripped Denim Shorts",
    "Everyday Black Shorts",
    "Classic Beige Shorts",
    "Off-White Lounge Shorts",
    "Colorblock Jersey Shorts",
    "Bright Red Mesh Shorts",
    "Textured Grey Shorts",
    "Raw Hem Denim Shorts"
  ]

};


// ============================================================
// COLOR IS AUTOMATICALLY DETECTED FROM PRODUCT NAME
// ============================================================

const colorNames = [
  "Black & White",
  "Black, Pink & White",
  "White & Black",
  "Red & White",
  "Blue & White",
  "Blue & Purple",
  "Orange & Blue",
  "Cream & Red",
  "Tan & Brown",

  "Multicolor",
  "Lavender",
  "Colorblock",
  "Colorblocked",

  "Light Blue",
  "Dark Blue",
  "Navy Blue",
  "Bright Blue",
  "Teal Blue",
  "Dusty Blue",

  "Olive Green",
  "Sage Green",
  "Emerald Green",
  "Bright Green",
  "Mint Green",

  "Deep Purple",
  "Dusty Purple",
  "Bright Purple",
  "Dusty Lavender",

  "Metallic Blue",
  "Metallic Silver",

  "Light Grey",
  "Dark Grey",
  "Light Gray",
  "Dark Gray",
  "Charcoal",

  "Off-White",
  "Hot Pink",
  "Bright Pink",
  "Dusty Pink",
  "Dusty Rose",

  "Mustard Yellow",
  "Bright Yellow",

  "Bright Orange",
  "Rust Orange",

  "Crimson Red",
  "Vibrant Red",
  "Berry Red",

  "Chestnut Brown",
  "Dark Brown",

  "Pastel Yellow",

  "Burgundy",
  "Maroon",
  "Magenta",
  "Lilac",
  "Plum",
  "Vine",

  "Terracotta",
  "Tan",
  "Navy",
  "Teal",
  "Olive",
  "Cream",
  "Beige",
  "Brown",
  "Yellow",
  "Orange",
  "Pink",
  "Red",
  "Blue",
  "Green",
  "Silver",
  "Grey",
  "Gray",
  "White",
  "Black"
];


// ============================================================
// GET COLOR FROM PRODUCT NAME
// ============================================================

function getColorFromName(name) {

  const lowerName =
    name.toLowerCase();

  const match =
    colorNames
      .slice()
      .sort(
        (a, b) =>
          b.length - a.length
      )
      .find(
        color =>
          lowerName.includes(
            color.toLowerCase()
          )
      );

  return match || "Multicolor";
}


// ============================================================
// CATEGORY → LOCAL IMAGE FOLDER
// ============================================================

const categoryFolder = {

  Dresses: "dresses",
  Tops: "tops",
  Shirts: "shirts",
  Jeans: "jeans",
  Pants: "pants",
  Joggers: "joggers",
  Jackets: "jackets",
  Skirts: "skirts",

  "T-Shirts": "t-shirts",
  Hoodies: "hoodies",
  Shorts: "shorts"

};


// ============================================================
// CATEGORY → STARTING PRICE
// ============================================================

const categoryPrices = {

  Dresses: 2299,
  Tops: 899,
  Shirts: 1399,
  Jeans: 1799,
  Pants: 1699,
  Joggers: 1299,
  Jackets: 2499,
  Skirts: 1499,

  "T-Shirts": 799,
  Hoodies: 1799,
  Shorts: 999

};


// ============================================================
// CREATE LOCAL IMAGE PATH
// ============================================================

function createImage(
  gender,
  category,
  index
) {

  const genderFolder =
    gender.toLowerCase();

  const folder =
    categoryFolder[category];

  const number =
    String(index + 1)
      .padStart(2, "0");

  return `/images/products/${genderFolder}/${folder}/${genderFolder}_${folder}_${number}.jpg`;

}


// ============================================================
// CREATE PRODUCTS
// ============================================================

function createProducts(
  gender,
  category
) {

  const names =
    gender === "Women"
      ? womenProductNames[category]
      : productNames[category];

  const basePrice =
    categoryPrices[category] || 1499;


  return Array.from(
    { length: 20 },
    (_, index) => {

      const number =
        index + 1;


      const price =
        basePrice +
        (index % 5) * 100;


      const isSale =
        index === 4 ||
        index === 9 ||
        index === 14 ||
        index === 19;


      let collection;


      if (index < 5) {

        collection =
          "New Arrivals";

      } else if (index < 10) {

        collection =
          "Best Sellers";

      } else if (index < 15) {

        collection =
          "Essentials";

      } else {

        collection =
          "Trending";

      }


      const isBottomWear =
        category === "Jeans" ||
        category === "Pants" ||
        category === "Shorts";


      const sizes =
        isBottomWear
          ? [
              "28",
              "30",
              "32",
              "34",
              "36",
              "38"
            ]
          : [
              "XS",
              "S",
              "M",
              "L",
              "XL",
              "XXL"
            ];


      let badge = "";


      if (index < 2) {

        badge =
          "NEW";

      } else if (isSale) {

        badge =
          "SALE";

      } else if (index < 7) {

        badge =
          "BESTSELLER";

      }


      return {

        id:
          `${gender.toLowerCase()}-` +
          `${category
            .toLowerCase()
            .replace(/\s+/g, "-")}-` +
          `${number}`,

        name:
          names[index],

        gender,

        category,

        collection,

        price,

        oldPrice:
          isSale
            ? price + 700
            : null,

        // ==================================================
        // IMPORTANT:
        // COLOR NOW COMES FROM PRODUCT NAME
        // ==================================================

        color:
          getColorFromName(
            names[index]
          ),

        sizes,

        badge,

        image:
          createImage(
            gender,
            category,
            index
          ),

        description:
          `A contemporary ${category.toLowerCase()} designed for the modern ${gender.toLowerCase()} wardrobe. Comfortable, versatile and easy to style.`,

        details: [
          "Premium fashion fabric",
          "Modern silhouette",
          "Designed for everyday wear",
          "Easy-care construction"
        ]

      };

    }
  );

}


// ============================================================
// WOMEN PRODUCTS
// 8 × 20 = 160
// ============================================================

const womenProducts = [

  ...createProducts(
    "Women",
    "Dresses"
  ),

  ...createProducts(
    "Women",
    "Tops"
  ),

  ...createProducts(
    "Women",
    "Shirts"
  ),

  ...createProducts(
    "Women",
    "Jeans"
  ),

  ...createProducts(
    "Women",
    "Pants"
  ),

  ...createProducts(
    "Women",
    "Joggers"
  ),

  ...createProducts(
    "Women",
    "Jackets"
  ),

  ...createProducts(
    "Women",
    "Skirts"
  )

];


// ============================================================
// MEN PRODUCTS
// 8 × 20 = 160
// ============================================================

const menProducts = [

  ...createProducts(
    "Men",
    "T-Shirts"
  ),

  ...createProducts(
    "Men",
    "Shirts"
  ),

  ...createProducts(
    "Men",
    "Jeans"
  ),

  ...createProducts(
    "Men",
    "Pants"
  ),

  ...createProducts(
    "Men",
    "Joggers"
  ),

  ...createProducts(
    "Men",
    "Jackets"
  ),

  ...createProducts(
    "Men",
    "Hoodies"
  ),

  ...createProducts(
    "Men",
    "Shorts"
  )

];


// ============================================================
// ALL PRODUCTS
// TOTAL = 320
// ============================================================

export const products = [

  ...womenProducts,
  ...menProducts

];


// ============================================================
// WOMEN CATEGORIES
// ============================================================

export const womenCategories = [

  "All",
  "Dresses",
  "Tops",
  "Shirts",
  "Jeans",
  "Pants",
  "Joggers",
  "Jackets",
  "Skirts"

];


// ============================================================
// MEN CATEGORIES
// ============================================================

export const menCategories = [

  "All",
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Pants",
  "Joggers",
  "Jackets",
  "Hoodies",
  "Shorts"

];


// ============================================================
// ALL CATEGORIES
// ============================================================

export const categories = [

  "All",

  ...new Set(
    products.map(
      product =>
        product.category
    )
  )

];


// ============================================================
// GET SINGLE PRODUCT
// ============================================================

export const getProduct = id => {

  return products.find(
    product =>
      product.id === id
  );

};


// ============================================================
// GET PRODUCTS BY CATEGORY
// ============================================================

export const getProductsByCategory =
  category => {

    return products.filter(
      product =>
        product.category === category
    );

  };


// ============================================================
// GET PRODUCTS BY GENDER
// ============================================================

export const getProductsByGender =
  gender => {

    return products.filter(
      product =>
        product.gender === gender
    );

  };


// ============================================================
// GET PRODUCTS BY COLLECTION
// ============================================================

export const getProductsByCollection =
  collection => {

    return products.filter(
      product =>
        product.collection === collection
    );

  };