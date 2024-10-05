import stylex from '@stylexjs/stylex';

const borderWidthStyles = stylex.create({
  button: {
    borderWidth: '1px',
  },
  buttonInverted: {
    borderWidth: '1px',
  },
  control: {
    borderWidth: '1px',
  },
  divider: {
    borderWidth: '1px',
  },
  frame: {
    borderWidth: '2px',
  },
  input: {
    borderWidth: '1px',
  },
  media: {
    borderWidth: '1px',
  },
});

const interactiveBorderWidthStyles = stylex.create({
  button: {
    outlineWidth: '1px',
  },
  buttonInverted: {
    outlineWidth: '1px',
  },
  control: {
    outlineWidth: '1px',
  },
  divider: {
    outlineWidth: '1px',
  },
  frame: {
    outlineWidth: '2px',
  },
  input: {
    outlineWidth: '1px',
  },
  media: {
    outlineWidth: '1px',
  },
});

const borderRadiusStyles = stylex.create({
  addon: {
    borderRadius: '4px',
  },
  content: {
    borderRadius: '4px',
  },
  container: {
    borderRadius: '4px',
  },
  control: {
    borderRadius: '4px',
  },
  layer: {
    borderRadius: '4px',
  },
  rounded: {
    borderRadius: '999px',
  },
});

const sizeStyles = stylex.create({
  landscape16: {
    height: '16px',
    width: '24px',
  },
  landscape21: {
    height: '21px',
    width: '31px',
  },
  landscape24: {
    height: '24px',
    width: '36px',
  },
  landscape30: {
    height: '30px',
    width: '45px',
  },
  landscape32: {
    height: '32px',
    width: '48px',
  },
  landscape40: {
    height: '40px',
    width: ' 60px',
  },
  landscape41: {
    height: '41px',
    width: '61px',
  },
  landscape48: {
    height: '48px',
    width: '72px',
  },
  landscape62: {
    height: '62px',
    width: '93px',
  },
  landscape64: {
    height: '64px',
    width: '96px',
  },
  landscape80: {
    height: '80px',
    width: '120px',
  },
  landscape94: {
    height: '94px',
    width: '141px',
  },
  landscape96: {
    height: '96px',
    width: '144px',
  },
  landscape118: {
    height: '118px',
    width: '177px',
  },
  landscape144: {
    height: '144px',
    width: '216px',
  },
  landscape180: {
    height: '180px',
    width: '270px',
  },
  landscape196: {
    height: '196px',
    width: '294px',
  },
  landscape300: {
    height: '300px',
    width: '450px',
  },
  portrait16: {
    height: '20px',
    width: '16px',
  },
  portrait21: {
    height: '26px',
    width: '21px',
  },
  portrait24: {
    height: '30px',
    width: '24px',
  },
  portrait30: {
    height: '37px',
    width: '30px',
  },
  portrait32: {
    height: '40px',
    width: '32px',
  },
  portrait40: {
    height: '50px',
    width: '40px',
  },
  portrait41: {
    height: '51px',
    width: '41px',
  },
  portrait48: {
    height: '60px',
    width: '48px',
  },
  portrait62: {
    height: '77px',
    width: '62px',
  },
  portrait64: {
    height: '80px',
    width: '64px',
  },
  portrait80: {
    height: '100px',
    width: '80px',
  },
  portrait94: {
    height: '117px',
    width: '94px',
  },
  portrait96: {
    height: '120px',
    width: '96px',
  },
  portrait118: {
    height: '147px',
    width: '118px',
  },
  portrait144: {
    height: '180px',
    width: '144px',
  },
  portrait180: {
    height: '225px',
    width: '180px',
  },
  portrait196: {
    height: '245px',
    width: '196px',
  },
  portrait300: {
    height: '375px',
    width: '300px',
  },
  portraitTall16: {
    height: '28px',
    width: '16px',
  },
  portraitTall21: {
    height: '37px',
    width: '21px',
  },
  portraitTall24: {
    height: '42px',
    width: '24px',
  },
  portraitTall30: {
    height: '53px',
    width: '30px',
  },
  portraitTall32: {
    height: '56px',
    width: '32px',
  },
  portraitTall40: {
    height: '71px',
    width: '40px',
  },
  portraitTall41: {
    height: '72px',
    width: '41px',
  },
  portraitTall48: {
    height: '85px',
    width: '48px',
  },
  portraitTall62: {
    height: '110px',
    width: '62px',
  },
  portraitTall64: {
    height: '113px',
    width: '64px',
  },
  portraitTall80: {
    height: '142px',
    width: '80px',
  },
  portraitTall94: {
    height: '167px',
    width: '94px',
  },
  portraitTall96: {
    height: '170px',
    width: '96px',
  },
  portraitTall118: {
    height: '209px',
    width: '118px',
  },
  portraitTall144: {
    height: '256px',
    width: '144px',
  },
  portraitTall180: {
    height: '320px',
    width: '180px',
  },
  portraitTall196: {
    height: '348px',
    width: '196px',
  },
  portraitTall300: {
    height: '533px',
    width: '300px',
  },
  square16: {
    height: '16px',
    width: '16px',
  },
  square21: {
    height: '21px',
    width: '21px',
  },
  square24: {
    height: '24px',
    width: '24px',
  },
  square30: {
    height: '30px',
    width: '30px',
  },
  square32: {
    height: '32px',
    width: '32px',
  },
  square40: {
    height: '40px',
    width: '40px',
  },
  square41: {
    height: '41px',
    width: '41px',
  },
  square48: {
    height: '48px',
    width: '48px',
  },
  square62: {
    height: '62px',
    width: '62px',
  },
  square64: {
    height: '64px',
    width: '64px',
  },
  square80: {
    height: '80px',
    width: '80px',
  },
  square94: {
    height: '94px',
    width: '94px',
  },
  square96: {
    height: '96px',
    width: '96px',
  },
  square118: {
    height: '118px',
    width: '118px',
  },
  square144: {
    height: '144px',
    width: '144px',
  },
  square180: {
    height: '180px',
    width: '180px',
  },
  square196: {
    height: '196px',
    width: '196px',
  },
  square300: {
    height: '300px',
    width: '300px',
  },
});

export const GeoPrivateNextAppearanceGeneratedStyles = {
  borderWidthStyles,
  interactiveBorderWidthStyles,
  borderRadiusStyles,
  sizeStyles,
};
