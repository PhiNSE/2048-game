export const getTileColor = (value: number | null): string => {
  const colorMap: Record<number, string> = {
    2: 'bg-amber-50 text-amber-950',
    4: 'bg-orange-100 text-orange-950',
    8: 'bg-orange-300 text-orange-950',
    16: 'bg-orange-500 text-white',
    32: 'bg-orange-600 text-white',
    64: 'bg-red-500 text-white',
    128: 'bg-yellow-400 text-yellow-950',
    256: 'bg-yellow-500 text-yellow-950',
    512: 'bg-lime-400 text-lime-950',
    1024: 'bg-emerald-500 text-white',
    2048: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
  };

  if (value === null) {
    return '';
  }

  if (value in colorMap) {
    return colorMap[value];
  }

  // For values beyond 2048, use animated gradient
  return 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white animate-pulse';
};

export const getTileBgColor = (value: number | null): string => {
  const colorMap: Record<number, string> = {
    2: 'bg-amber-50',
    4: 'bg-orange-100',
    8: 'bg-orange-300',
    16: 'bg-orange-500',
    32: 'bg-orange-600',
    64: 'bg-red-500',
    128: 'bg-yellow-400',
    256: 'bg-yellow-500',
    512: 'bg-lime-400',
    1024: 'bg-emerald-500',
    2048: 'bg-gradient-to-br from-purple-500 to-pink-500',
  };

  if (value === null) {
    return 'bg-gray-200';
  }

  if (value in colorMap) {
    return colorMap[value];
  }

  return 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500';
};

export const getTileTextColor = (value: number | null): string => {
  if (value === null) return '';
  if (value <= 4) return 'text-amber-950';
  if (value <= 8) return 'text-orange-950';
  return 'text-white';
};
