import Image from "next/image";
import { FEMALE_GUIDE_PHOTOS, MALE_GUIDE_PHOTOS } from "@/constants/photo";

const PhotoGuidePhotos = ({ sex }: { sex: string }) => {
  const photos = sex === "female" ? FEMALE_GUIDE_PHOTOS : MALE_GUIDE_PHOTOS;
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo) => (
          <Image
            key={photo.id}
            src={photo.path}
            alt={`${sex} guide photo ${photo.id}`}
            width={512}
            height={768}
            className="rounded-lg object-cover w-full h-[200px] sm:h-[500px] "
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGuidePhotos;
