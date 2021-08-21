const theme = (boolen) =>
  boolen
    ? {
        Default: "default",
        Red: "caputMortuum",
        Orange: "fieldDrab",
        Yellow: "antiqueBronze",
        Green: "lincolnGreen",
        Teal: "deepJungleGreen",
        Blue: "darkSlateGray",
        DarkBlue: "prussianBlue",
        Purple: "russianViolet",
        Pink: "tyrianPurple",
        Brown: "cafeNoir",
        Gray: "cnyx",
      }
    : {
        Default: "default",
        Red: "congoPink",
        Orange: "mango",
        Yellow: "corn",
        Green: "mindaro",
        Teal: "magicMint",
        Blue: "powderBlue",
        DarkBlue: "babyBlueEyes",
        Purple: "mauve",
        Pink: "pinkLace",
        Brown: "desertSand",
        Gray: "cultured",
      };

export default theme;
