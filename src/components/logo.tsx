export const Logo = () => {
  return (
    <span className="text-2xl font-black text-muted-foreground">
      <span
        className={
          "inline-flex animate-text-gradient bg-[200%_auto] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#999999] via-[#808080] to-[#999999] dark:from-[#E8E8E8] dark:via-[#D3D3D3] dark:to-[#E8E8E8]"
        }
      >
        aesthetic
      </span>
      <span
        className={
          "inline-flex animate-text-gradient bg-[200%_auto] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ffd700] via-[#ffb700] to-[#ffd700] dark:from-[#ffd700] dark:via-[#ffb700] dark:to-[#ffd700]"
        }
      >
        rank
      </span>
    </span>
  );
};
