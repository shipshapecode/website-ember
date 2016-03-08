module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'shipshapesite',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
