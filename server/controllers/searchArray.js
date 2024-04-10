const searchArray = {
  searched(req, res, next) {
    console.log('STARTING searchArray searched MIDDLEWARE')
    const array = res.locals.array;

    const aggregatedData = array.reduce((acc, el) => {
      const name = el.data.name.data;
      let value = 0;

      // if current item has a price, then set value to that price, else stay at 0
      if (el.data.totalPrice) {
        value = Number(el.data.totalPrice.data); // Assuming this is a string that needs to be converted to a number
      }

      if (acc[name]) {
        acc[name] += value; // If the name already exists, add the value
      } else {
        acc[name] = value; // Otherwise, initialize it with the value
      }

      return acc;

    }, {});
    console.log('obj', aggregatedData);
    const searchNameAndValue = Object.entries(aggregatedData).map(([type, value]) => ({
      type,
      value,
    }));
    res.locals.array = searchNameAndValue;
    return next();
  },
};

export default searchArray;
