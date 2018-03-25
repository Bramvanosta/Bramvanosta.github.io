const waitFor = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default waitFor;
