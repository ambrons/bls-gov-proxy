module.exports = function(grunt) {
  
  // Project configuration
  grunt.initConfig({
    connect: {
        server: {
            options: {
                port: 8000,
                hostname: 'localhost',
                base: 'example',
                keepalive: true,
                middleware: function(connect, options, middlewares) {
                    middlewares.unshift(
                        require('json-proxy').initialize({
                            proxy: {
                                forward: {
                                    '/bls/api/(.*)': 'http://api.bls.gov/publicAPI/$1'
                                }
                            }
                        })
                    );

                    return middlewares;
                }
            }
        }
    }
  });

  // Load grunt tasks -- yeah there's contribs to do this for you
  grunt.loadNpmTasks('grunt-contrib-connect');

  // default task -- aka type 'grunt' by itself
  grunt.registerTask('default', ['connect']);
};