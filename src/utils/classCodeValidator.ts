// Class code to section name mapping
const CLASS_SECTIONS: { [key: string]: string } = {
  'ECO123': 'Environmental Science - Section A',
  'GRN456': 'Green Technology - Section B',
  'SUST89': 'Sustainability Studies - Section C',
  'CLIM12': 'Climate Action - Section D',
  'EARTH7': 'Earth Sciences - Section E',
  'RENEW3': 'Renewable Energy - Section F',
  'BIO456': 'Biodiversity - Section G',
  'OCEAN9': 'Ocean Conservation - Section H',
  'FOREST': 'Forest Ecology - Section I',
  'URBAN2': 'Urban Sustainability - Section J',
};

export const validateClassCode = (classCode: string): { isValid: boolean; sectionName?: string } => {
  const upperCaseCode = classCode.toUpperCase().trim();
  
  if (CLASS_SECTIONS[upperCaseCode]) {
    return {
      isValid: true,
      sectionName: CLASS_SECTIONS[upperCaseCode]
    };
  }
  
  return { isValid: false };
};

export const getAllClassCodes = () => Object.keys(CLASS_SECTIONS);