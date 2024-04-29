import Image from "next/image";

type ItemImageProps = {
    image: string;
};

export default function ItemImage({ image }: ItemImageProps) {
    const defaultImage = "/sin_imagen.jpg"

    const imageOutput = image ?? defaultImage;

    return (
        <div>
            <Image
                alt="Pokemon"
                className="object-cover rounded-xl"
                src={imageOutput}
                width={400}
                height={400} 
            />
        </div>
    );
}
