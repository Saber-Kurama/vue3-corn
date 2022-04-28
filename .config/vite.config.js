module.exports = function(config) {
  // Custom vite config here
  const output = config?.build?.rollupOptions?.output;
  output.map((obj) => {
    if(obj.sourcemap) {
      obj.sourcemap = false;
    }
  })
  // config.build.sourcemap = false;
  return config;
};

