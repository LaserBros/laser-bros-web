const getMaterialColor = (materials,colorCode) => {
    switch (materials) {
      case "Aluminium 5052":
        return { backgroundColor: "rgb(79 140 202)" };
      case "Steel 1008":
      case "Steel A36":
        return { backgroundColor: "rgb(225 31 38)" };
      case "Aluminium 6061":
        return { backgroundColor: "rgb(160 197 233)" };
      case "Stainless Steel 304 (2b)":
      case "Stainless Steel 304 (#4)":
      case "Stainless Steel 316 (2b)":
        return { backgroundColor: "rgb(42 92 23)" };
      case "Brass 260":
        return { backgroundColor: "rgb(255 186 22)" };
      case "Custom i.e. Titanium, Incolnel, etc.":
        return { backgroundColor: "rgb(115 103 240)" };
      default:
        return {
          backgroundColor: colorCode 
        };
    }
  };

  export default getMaterialColor;