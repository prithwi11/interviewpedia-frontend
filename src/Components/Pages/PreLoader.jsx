import { IMAGE_NAME } from "../enums";

const PreLoader = () => {
    return (
        <div class="preloader flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-white z-50">
            <img src={IMAGE_NAME.IMAGE_NAME.LOGO_SPINNER} alt="spinner" class="w-40 h-40 rounded-full " />
        </div>
    )
}

export default PreLoader