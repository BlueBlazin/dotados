import cv2
import dlib

RESIZE_MAX_LENGTH = 200


def resize_image(image, max_length):
    height, width, _ = image.shape

    ratio = height / width

    if height > width:
        new_height = max_length
        new_width = int(new_height / ratio)
    else:
        new_width = max_length
        new_height = int(new_width * ratio)

    dim = (new_width, new_height)

    return cv2.resize(image, dsize=dim, interpolation=cv2.INTER_AREA)


def center_crop_image(image):
    height, width, _ = image.shape

    detector = dlib.get_frontal_face_detector()

    faces = detector(image, 1)

    if len(faces) == 1:
        face = faces[0]

        x = (face.left() + face.right()) // 2
        y = (face.top() + face.bottom()) // 2

        size = min(y, height - y, x, width - x)

        return image[y-size:y+size, x-size:x+size, :]
    else:
        return image


def _center_and_save(img_path, dst_path=None):
    *img_name, img_format = img_path.split(".")
    img_name = ".".join(img_name)

    img = cv2.imread('test.jpg', cv2.IMREAD_UNCHANGED)

    resized_img = resize_image(img)

    centered_img = center_crop_image(resized_img)

    dst = dst_path if dst_path is not None else f"{img_name}.{img_format}"
    cv2.imwrite(dst, centered_img)


def center_and_save(src_path, dst_path=None):
    img = cv2.imread(src_path, cv2.IMREAD_UNCHANGED)

    resized_img = resize_image(img, max_length=RESIZE_MAX_LENGTH)

    centered_img = center_crop_image(resized_img)

    cv2.imwrite(dst_path, centered_img)


if __name__ == "__main__":
    _center_and_save('test.jpg')
