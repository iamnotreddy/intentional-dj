export const SpotifyPlayer = () => {
  return (
    <div className="fixed bottom-0 w-full border-t-2 border-black bg-green-200 p-4">
      <div className="flex flex-row items-center space-x-4">
        <div className="flex h-16 w-16 border-2 border-slate-400 text-center">
          <p>album art </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xl">Song Title </p>
          <p className="text-md">Artist</p>
        </div>
      </div>
    </div>
  );
};
