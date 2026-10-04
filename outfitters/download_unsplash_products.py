"""
OUTFITTERS - DOWNLOAD ALL 320 PRODUCT PHOTOS LOCALLY

Run this file from the ROOT of your React project:

    python download_unsplash_products.py

It creates:

public/images/products/
    women/
        dresses/
        tops/
        shirts/
        jeans/
        pants/
        joggers/
        jackets/
        skirts/
    men/
        t-shirts/
        shirts/
        jeans/
        pants/
        joggers/
        jackets/
        hoodies/
        shorts/

It also creates:

outfitters_product_images.zip

IMPORTANT:
- These are the exact Unsplash image IDs supplied in the original product database.
- The script saves them as JPG files using the same names expected by products.js.
- Some URLs in the original list are intentionally repeated; those repeated products will therefore use the same photograph.
- If an image cannot be downloaded, the script reports it instead of silently creating a broken file.
"""

from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
from zipfile import ZipFile, ZIP_DEFLATED
import time
import shutil

# ============================================================
# SETTINGS
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parent
IMAGE_ROOT = PROJECT_ROOT / "public" / "images" / "products"
ZIP_FILE = PROJECT_ROOT / "outfitters_product_images.zip"

IMAGE_WIDTH = 900
IMAGE_QUALITY = 85

# True = download again even if a file already exists.
# False = keep an existing successfully downloaded image.
OVERWRITE = False

# Number of retry attempts per image.
RETRIES = 3


# ============================================================
# IMAGE IDs
# ============================================================

WOMEN_IMAGES = {
    'Dresses': [
        '1496747611176-843222e1e57c', '1515372039744-b8f02a3ae446', '1566174053879-31528523f8ae', '1539008835657-9e8e9680c956', '1595777457583-95e059d581b8',
        '1591369822096-ffd140ec948f', '1572804013309-59a88b7e92f1', '1591369822096-ffd140ec948f', '1585488432227-2f3b0f8d3f31', '1612336307429-8a898d10e223',
        '1551028719-00167b16eac5', '1525507119028-ed4c629a60a3', '1542291026-7eec264c27ff', '1496217590455-aa63a8350eea', '1506629905607-d9c297d4f4d8',
        '1583496661160-fb5886a0aaaa', '1485968579580-b6d095142e6e', '1490481651871-ab68de25d43d', '1515886657613-9f3515b0c78f', '1483985988355-763728e1935b',
    ],
    'Tops': [
        '1521572163474-6864f9cf17ab', '1627225924765-552d49cf47ad', '1551488831-00ddcb6c6bd3', '1564257631407-3deb7c6f1eff', '1503342217505-b0a15ec3261c',
        '1562157873-818bc0726f68', '1594633312681-425c7b97ccd1', '1583743814966-8936f37f4678', '1576566588028-4147f3842f27', '1554568218-0f1715e72254',
        '1566206091558-7f218b696731', '1551028719-00167b16eac5', '1571455786673-9d9d6c194f90', '1608234807905-4466023792f5', '1596755389378-c31d21fd1273',
        '1607345366928-199ea26cfe3e', '1581655353564-df123a1eb820', '1618354691373-d851c5c3a990', '1598033129183-c4f50c736f10', '1620799140408-edc6dcb6d633',
    ],
    'Shirts': [
        '1605763240000-7e93b172d754', '1602810318383-e386cc2a3ccf', '1596755389378-c31d21fd1273', '1603252110481-7ba873bf42ab', '1604695573706-53170668f6a6',
        '1618932260643-eee4a2f652a6', '1589310243389-96a5483213a8', '1594938298603-c8148c4dae35', '1596755389378-c31d21fd1273', '1564257577054-8b7e7d4d8a89',
        '1621072156002-e2fccdc0b176', '1610652492500-ded49ceeb378', '1598808503746-f34c53b9323e', '1589310243389-96a5483213a8', '1617127365659-c47fa864d8bc',
        '1598033129183-c4f50c736f10', '1618354691373-d851c5c3a990', '1551488831-00ddcb6c6bd3', '1578932750294-f5075e85f44a', '1596755389378-c31d21fd1273',
    ],
    'Jeans': [
        '1541099649105-f69ad21f3246', '1582418702059-97ebafb35d09', '1542272604-787c3835535d', '1555689502-c4b22d76c56f', '1475178626620-a4d074967452',
        '1548883354-7622d03aca27', '1552902865-b72c031ac5ea', '1565084888279-aca607ecce0c', '1604176354204-9268737828e4', '1594633312681-425c7b97ccd1',
        '1551537482-f2075a1d41f2', '1584370848010-d7fe6bc767ec', '1602293589930-45aad59ba3ab', '1582552938357-32b906df40cb', '1576995853123-5a10305d93c0',
        '1548883354-7622d03aca27', '1568844293986-ca9c5b1e5d6d', '1608450296374-4e1b5c3d8f1c', '1551854838-212c50b4c184', '1541099649105-f69ad21f3246',
    ],
    'Pants': [
        '1506629905607-d9c297d4f4d8', '1594633312681-425c7b97ccd1', '1509551388413-e18d0ac5d495', '1624378439575-d8705ad7ae80', '1594938298603-c8148c4dae35',
        '1552902865-b72c031ac5ea', '1584370848010-d7fe6bc767ec', '1603252109303-2751441dd157', '1610652492500-ded49ceeb378', '1515886657613-9f3515b0c78f',
        '1591369822096-ffd140ec948f', '1551488831-00ddcb6c6bd3', '1583496661160-fb5886a0aaaa', '1585488432227-2f3b0f8d3f31', '1572804013309-59a88b7e92f1',
        '1595777457583-95e059d581b8', '1607345366928-199ea26cfe3e', '1571455786673-9d9d6c194f90', '1618354691373-d851c5c3a990', '1596755389378-c31d21fd1273',
    ],
    'Joggers': [
        '1551028719-00167b16eac5', '1551488831-00ddcb6c6bd3', '1515886657613-9f3515b0c78f', '1503342217505-b0a15ec3261c', '1566206091558-7f218b696731',
        '1594633312681-425c7b97ccd1', '1576566588028-4147f3842f27', '1583743814966-8936f37f4678', '1607345366928-199ea26cfe3e', '1598033129183-c4f50c736f10',
        '1620799140408-edc6dcb6d633', '1618354691373-d851c5c3a990', '1581655353564-df123a1eb820', '1554568218-0f1715e72254', '1562157873-818bc0726f68',
        '1578932750294-f5075e85f44a', '1596755389378-c31d21fd1273', '1608234807905-4466023792f5', '1598808503746-f34c53b9323e', '1617127365659-c47fa864d8bc',
    ],
    'Jackets': [
        '1543076447-215ad9ba6923', '1551028719-00167b16eac5', '1520975916090-3105956dac38', '1548126032-079a0fb0099d', '1517841905240-472988babdf9',
        '1551488831-00ddcb6c6bd3', '1529139574466-a303027c1d8b', '1544441893-675973e31985', '1591047139829-d91aecb6caea', '1544966503-7cc5ac882d5f',
        '1576995853123-5a10305d93c0', '1551488831-00ddcb6c6bd3', '1585488432227-2f3b0f8d3f31', '1515886657613-9f3515b0c78f', '1603252109303-2751441dd157',
        '1589310243389-96a5483213a8', '1618932260643-eee4a2f652a6', '1594938298603-c8148c4dae35', '1610652492500-ded49ceeb378', '1621072156002-e2fccdc0b176',
    ],
    'Skirts': [
        '1583496661160-fb5886a0aaaa', '1572804013309-59a88b7e92f1', '1551028719-00167b16eac5', '1515372039744-b8f02a3ae446', '1566174053879-31528523f8ae',
        '1539008835657-9e8e9680c956', '1595777457583-95e059d581b8', '1591369822096-ffd140ec948f', '1485968579580-b6d095142e6e', '1490481651871-ab68de25d43d',
        '1515886657613-9f3515b0c78f', '1506629905607-d9c297d4f4d8', '1503342217505-b0a15ec3261c', '1585488432227-2f3b0f8d3f31', '1612336307429-8a898d10e223',
        '1598808503746-f34c53b9323e', '1603252109303-2751441dd157', '1607345366928-199ea26cfe3e', '1571455786673-9d9d6c194f90', '1618354691373-d851c5c3a990',
    ],
}

MEN_IMAGES = {
    'T-Shirts': [
        '1521572163474-6864f9cf17ab', '1583743814966-8936f37f4678', '1576566588028-4147f3842f27', '1603252109303-2751441dd157', '1627225924765-552d49cf47ad',
        '1554568218-0f1715e72254', '1562157873-818bc0726f68', '1598033129183-c4f50c736f10', '1618354691373-d851c5c3a990', '1607345366928-199ea26cfe3e',
        '1596755389378-c31d21fd1273', '1620799140408-edc6dcb6d633', '1578932750294-f5075e85f44a', '1617127365659-c47fa864d8bc', '1598808503746-f34c53b9323e',
        '1581655353564-df123a1eb820', '1594633312681-425c7b97ccd1', '1608234807905-4466023792f5', '1566206091558-7f218b696731', '1551488831-00ddcb6c6bd3',
    ],
    'Shirts': [
        '1602810318383-e386cc2a3ccf', '1618932260643-eee4a2f652a6', '1603252110481-7ba873bf42ab', '1604695573706-53170668f6a6', '1596755389378-c31d21fd1273',
        '1621072156002-e2fccdc0b176', '1610652492500-ded49ceeb378', '1589310243389-96a5483213a8', '1594938298603-c8148c4dae35', '1598033129183-c4f50c736f10',
        '1617127365659-c47fa864d8bc', '1598808503746-f34c53b9323e', '1581655353564-df123a1eb820', '1554568218-0f1715e72254', '1578932750294-f5075e85f44a',
        '1607345366928-199ea26cfe3e', '1620799140408-edc6dcb6d633', '1562157873-818bc0726f68', '1576566588028-4147f3842f27', '1583743814966-8936f37f4678',
    ],
    'Jeans': [
        '1542272604-787c3835535d', '1555689502-c4b22d76c56f', '1475178626620-a4d074967452', '1548883354-7622d03aca27', '1552902865-b72c031ac5ea',
        '1565084888279-aca607ecce0c', '1604176354204-9268737828e4', '1584370848010-d7fe6bc767ec', '1602293589930-45aad59ba3ab', '1582552938357-32b906df40cb',
        '1576995853123-5a10305d93c0', '1541099649105-f69ad21f3246', '1568844293986-ca9c5b1e5d6d', '1551854838-212c50b4c184', '1548883354-7622d03aca27',
        '1608450296374-4e1b5c3d8f1c', '1555689502-c4b22d76c56f', '1475178626620-a4d074967452', '1604176354204-9268737828e4', '1542272604-787c3835535d',
    ],
    'Pants': [
        '1624378439575-d8705ad7ae80', '1594938298603-c8148c4dae35', '1552902865-b72c031ac5ea', '1584370848010-d7fe6bc767ec', '1603252109303-2751441dd157',
        '1515886657613-9f3515b0c78f', '1551028719-00167b16eac5', '1594633312681-425c7b97ccd1', '1607345366928-199ea26cfe3e', '1576566588028-4147f3842f27',
        '1581655353564-df123a1eb820', '1554568218-0f1715e72254', '1596755389378-c31d21fd1273', '1618354691373-d851c5c3a990', '1598033129183-c4f50c736f10',
        '1620799140408-edc6dcb6d633', '1578932750294-f5075e85f44a', '1617127365659-c47fa864d8bc', '1598808503746-f34c53b9323e', '1608234807905-4466023792f5',
    ],
    'Joggers': [
        '1551028719-00167b16eac5', '1576566588028-4147f3842f27', '1583743814966-8936f37f4678', '1607345366928-199ea26cfe3e', '1598033129183-c4f50c736f10',
        '1620799140408-edc6dcb6d633', '1618354691373-d851c5c3a990', '1581655353564-df123a1eb820', '1554568218-0f1715e72254', '1562157873-818bc0726f68',
        '1596755389378-c31d21fd1273', '1578932750294-f5075e85f44a', '1617127365659-c47fa864d8bc', '1598808503746-f34c53b9323e', '1608234807905-4466023792f5',
        '1594633312681-425c7b97ccd1', '1603252109303-2751441dd157', '1551488831-00ddcb6c6bd3', '1566206091558-7f218b696731', '1503342217505-b0a15ec3261c',
    ],
    'Jackets': [
        '1543076447-215ad9ba6923', '1591047139829-d91aecb6caea', '1548126032-079a0fb0099d', '1544966503-7cc5ac882d5f', '1551028719-00167b16eac5',
        '1520975916090-3105956dac38', '1517841905240-472988babdf9', '1544441893-675973e31985', '1576995853123-5a10305d93c0', '1585488432227-2f3b0f8d3f31',
        '1618932260643-eee4a2f652a6', '1594938298603-c8148c4dae35', '1610652492500-ded49ceeb378', '1621072156002-e2fccdc0b176', '1589310243389-96a5483213a8',
        '1603252109303-2751441dd157', '1551488831-00ddcb6c6bd3', '1515886657613-9f3515b0c78f', '1596755389378-c31d21fd1273', '1617127365659-c47fa864d8bc',
    ],
    'Hoodies': [
        '1556821840-3a63f95609a7', '1578681994506-b8f463449011', '1620799140408-edc6dcb6d633', '1618354691373-d851c5c3a990', '1581655353564-df123a1eb820',
        '1576566588028-4147f3842f27', '1583743814966-8936f37f4678', '1554568218-0f1715e72254', '1607345366928-199ea26cfe3e', '1598033129183-c4f50c736f10',
        '1596755389378-c31d21fd1273', '1578932750294-f5075e85f44a', '1617127365659-c47fa864d8bc', '1598808503746-f34c53b9323e', '1608234807905-4466023792f5',
        '1562157873-818bc0726f68', '1503342217505-b0a15ec3261c', '1551488831-00ddcb6c6bd3', '1566206091558-7f218b696731', '1594633312681-425c7b97ccd1',
    ],
    'Shorts': [
        '1591195853828-11db59a44f6b', '1565084888279-aca607ecce0c', '1604176354204-9268737828e4', '1584370848010-d7fe6bc767ec', '1542272604-787c3835535d',
        '1555689502-c4b22d76c56f', '1475178626620-a4d074967452', '1548883354-7622d03aca27', '1552902865-b72c031ac5ea', '1576995853123-5a10305d93c0',
        '1602293589930-45aad59ba3ab', '1582552938357-32b906df40cb', '1541099649105-f69ad21f3246', '1568844293986-ca9c5b1e5d6d', '1551854838-212c50b4c184',
        '1608450296374-4e1b5c3d8f1c', '1585488432227-2f3b0f8d3f31', '1594938298603-c8148c4dae35', '1603252109303-2751441dd157', '1624378439575-d8705ad7ae80',
    ],
}


# ============================================================
# HELPERS
# ============================================================

def image_url(image_id):
    """
    Create the Unsplash JPG URL.
    """
    return (
        f"https://images.unsplash.com/photo-{image_id}"
        f"?fm=jpg&w={IMAGE_WIDTH}&q={IMAGE_QUALITY}&fit=crop"
    )


def is_valid_file(path):
    """
    Check whether a local image exists and is not empty/corrupt-sized.
    """
    return (
        path.exists()
        and path.is_file()
        and path.stat().st_size > 1000
    )


def download_image(url, destination):
    """
    Download one image with retries.
    """

    if is_valid_file(destination) and not OVERWRITE:
        return "exists"

    last_error = None

    for attempt in range(1, RETRIES + 1):

        try:

            request = Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0"
                }
            )

            with urlopen(
                request,
                timeout=30
            ) as response:

                data = response.read()

            if len(data) < 1000:
                raise ValueError(
                    "Downloaded response is too small."
                )

            destination.parent.mkdir(
                parents=True,
                exist_ok=True
            )

            with open(
                destination,
                "wb"
            ) as file:

                file.write(data)

            return "downloaded"

        except Exception as error:

            last_error = error

            if attempt < RETRIES:

                print(
                    f"    Retry {attempt}/{RETRIES - 1}..."
                )

                time.sleep(2)

    print(
        f"    ERROR: {last_error}"
    )

    return "failed"


# ============================================================
# FIND FALLBACK IMAGE
# ============================================================

def find_fallback_source(
    gender,
    category,
    successful_files
):
    """
    Find an already-working local image.

    Priority:
    1. Same gender + same category
    2. Same gender
    3. Any product image
    """

    # --------------------------------------------------------
    # SAME CATEGORY
    # --------------------------------------------------------

    category_key = (
        gender,
        category
    )

    same_category = successful_files.get(
        category_key,
        []
    )

    if same_category:

        return same_category[0]

    # --------------------------------------------------------
    # SAME GENDER
    # --------------------------------------------------------

    same_gender = []

    for (
        file_gender,
        file_category
    ), files in successful_files.items():

        if file_gender == gender:

            same_gender.extend(
                files
            )

    if same_gender:

        return same_gender[0]

    # --------------------------------------------------------
    # ANY IMAGE
    # --------------------------------------------------------

    all_files = []

    for files in successful_files.values():

        all_files.extend(
            files
        )

    if all_files:

        return all_files[0]

    return None


# ============================================================
# CREATE FALLBACK
# ============================================================

def create_fallback(
    destination,
    source
):
    """
    Copy a valid local image to the failed product filename.

    This guarantees that React has a local JPG instead of
    a broken image.
    """

    if source is None:

        return False

    try:

        destination.parent.mkdir(
            parents=True,
            exist_ok=True
        )

        shutil.copy2(
            source,
            destination
        )

        return is_valid_file(
            destination
        )

    except Exception as error:

        print(
            f"    FALLBACK ERROR: {error}"
        )

        return False


# ============================================================
# DOWNLOAD ALL IMAGES
# ============================================================

def download_all():

    IMAGE_ROOT.mkdir(
        parents=True,
        exist_ok=True
    )

    total = 0
    downloaded = 0
    existing = 0
    failed = 0

    # Failed images are stored here first.
    failed_files = []

    # Successful images are stored here for fallback use.
    successful_files = {}

    all_sets = [
        (
            "women",
            WOMEN_IMAGES
        ),
        (
            "men",
            MEN_IMAGES
        )
    ]

    # ========================================================
    # DOWNLOAD
    # ========================================================

    for gender, categories in all_sets:

        for category, image_ids in categories.items():

            folder = (
                category
                .lower()
                .replace(
                    " ",
                    "-"
                )
            )

            category_key = (
                gender,
                category
            )

            successful_files.setdefault(
                category_key,
                []
            )

            print()
            print(
                "=" * 60
            )

            print(
                f"{gender.upper()} / "
                f"{category.upper()}"
            )

            print(
                "=" * 60
            )

            for index, image_id in enumerate(
                image_ids,
                start=1
            ):

                total += 1

                filename = (
                    f"{gender}_"
                    f"{folder}_"
                    f"{index:02d}.jpg"
                )

                destination = (
                    IMAGE_ROOT
                    / gender
                    / folder
                    / filename
                )

                url = image_url(
                    image_id
                )

                print(
                    f"[{total:03d}/320] "
                    f"{gender}/{folder}/{filename}"
                )

                result = download_image(
                    url,
                    destination
                )

                # ------------------------------------------------
                # SUCCESS
                # ------------------------------------------------

                if result == "downloaded":

                    downloaded += 1

                    successful_files[
                        category_key
                    ].append(
                        destination
                    )

                    print(
                        "    OK"
                    )

                # ------------------------------------------------
                # ALREADY EXISTS
                # ------------------------------------------------

                elif result == "exists":

                    existing += 1

                    successful_files[
                        category_key
                    ].append(
                        destination
                    )

                    print(
                        "    EXISTS"
                    )

                # ------------------------------------------------
                # FAILED
                # ------------------------------------------------

                else:

                    failed += 1

                    failed_files.append(
                        {
                            "gender": gender,
                            "category": category,
                            "destination": destination
                        }
                    )

                    print(
                        "    FAILED"
                    )

    # ========================================================
    # CREATE FALLBACKS
    # ========================================================

    fallback_created = 0
    fallback_failed = 0

    print()
    print(
        "=" * 60
    )
    print(
        "CREATING FALLBACK IMAGES"
    )
    print(
        "=" * 60
    )

    for item in failed_files:

        gender = item[
            "gender"
        ]

        category = item[
            "category"
        ]

        destination = item[
            "destination"
        ]

        source = find_fallback_source(
            gender,
            category,
            successful_files
        )

        print()
        print(
            f"Fallback for "
            f"{gender}/{category}"
        )

        print(
            f"Target: "
            f"{destination}"
        )

        if source:

            print(
                f"Using: "
                f"{source}"
            )

            if create_fallback(
                destination,
                source
            ):

                fallback_created += 1

                print(
                    "    FALLBACK CREATED"
                )

            else:

                fallback_failed += 1

                print(
                    "    FALLBACK FAILED"
                )

        else:

            fallback_failed += 1

            print(
                "    NO FALLBACK SOURCE AVAILABLE"
            )

    return (
        total,
        downloaded,
        existing,
        failed,
        fallback_created,
        fallback_failed
    )


# ============================================================
# CREATE ZIP
# ============================================================

def create_zip():

    if ZIP_FILE.exists():

        ZIP_FILE.unlink()

    print()
    print(
        "=" * 60
    )
    print(
        "CREATING ZIP"
    )
    print(
        "=" * 60
    )

    file_count = 0

    with ZipFile(
        ZIP_FILE,
        "w",
        ZIP_DEFLATED
    ) as zip_file:

        for file in IMAGE_ROOT.rglob("*"):

            if file.is_file():

                relative_path = (
                    file.relative_to(
                        PROJECT_ROOT
                    )
                )

                zip_file.write(
                    file,
                    relative_path
                )

                file_count += 1

    print(
        f"Images added to ZIP: "
        f"{file_count}"
    )

    return (
        ZIP_FILE,
        file_count
    )


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    print()
    print(
        "=" * 60
    )

    print(
        "OUTFITTERS - LOCAL PRODUCT IMAGE DOWNLOADER"
    )

    print(
        "=" * 60
    )

    print()
    print(
        f"Project root : {PROJECT_ROOT}"
    )

    print(
        f"Image folder : {IMAGE_ROOT}"
    )

    print(
        f"ZIP file     : {ZIP_FILE}"
    )

    # ========================================================
    # DOWNLOAD
    # ========================================================

    (
        total,
        downloaded,
        existing,
        failed,
        fallback_created,
        fallback_failed
    ) = download_all()

    # ========================================================
    # CHECK FINAL FILES
    # ========================================================

    all_jpg_files = list(
        IMAGE_ROOT.rglob(
            "*.jpg"
        )
    )

    valid_files = [
        file
        for file in all_jpg_files
        if is_valid_file(file)
    ]

    missing = (
        320 - len(valid_files)
    )

    if missing < 0:

        missing = 0

    # ========================================================
    # ALWAYS CREATE ZIP
    # ========================================================

    zip_path, zip_count = create_zip()

    # ========================================================
    # FINAL SUMMARY
    # ========================================================

    print()
    print(
        "=" * 60
    )

    print(
        "FINAL SUMMARY"
    )

    print(
        "=" * 60
    )

    print(
        f"Expected products       : 320"
    )

    print(
        f"Configured image entries: {total}"
    )

    print(
        f"New downloads            : {downloaded}"
    )

    print(
        f"Already existed          : {existing}"
    )

    print(
        f"Original failed          : {failed}"
    )

    print(
        f"Fallbacks created        : {fallback_created}"
    )

    print(
        f"Fallbacks failed         : {fallback_failed}"
    )

    print(
        f"Valid local JPG files    : {len(valid_files)}"
    )

    print(
        f"Missing local JPG files  : {missing}"
    )

    print(
        f"Images in ZIP            : {zip_count}"
    )

    print()

    if missing == 0:

        print(
            "SUCCESS!"
        )

        print(
            "All 320 product filenames "
            "have local JPG images."
        )

    else:

        print(
            "WARNING!"
        )

        print(
            f"{missing} image files are still missing."
        )

    print()
    print(
        "Local images:"
    )

    print(
        IMAGE_ROOT
    )

    print()
    print(
        "ZIP:"
    )

    print(
        zip_path
    )

    print()
    print(
        "=" * 60
    )

    print(
        "IMPORTANT: products.js must use .jpg"
    )

    print(
        "=" * 60
    )

    print()

    print(
        "Use this inside createImage():"
    )

    print()

    print(
        'return `/images/products/${genderFolder}/${folder}/${genderFolder}_${folder}_${number}.jpg`;'
    )

    print()
    print(
        "Finished."
    )