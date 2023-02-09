////initial
//var w = c.width = window.innerWidth,
//    h = c.height = window.innerHeight,
//    ctx = c.getContext('2d'),

//    //parameters
//    total = w,
//    accelleration = .05,

//    //afterinitial calculations
//    size = w / total,
//    occupation = w / total,
//    repaintColor = 'rgba(255, 255, 255, .04)'
//colors = [],
//    dots = [],
//    dotsVel = [];

////setting the colors' hue
////and y level for all dots
//var portion = 360 / total;
//for (var i = 0; i < total; ++i) {
//    colors[i] = portion * i;

//    dots[i] = h;
//    dotsVel[i] = 10;
//}

//function anim() {
//    window.requestAnimationFrame(anim);

//    ctx.fillStyle = repaintColor;
//    ctx.fillRect(0, 0, w, h);

//    for (var i = 0; i < total; ++i) {
//        var currentY = dots[i] - 1;
//        dots[i] += dotsVel[i] += accelleration;

//        ctx.fillStyle = 'hsl(' + colors[i] + ', 80%, 50%)';
//        ctx.fillRect(occupation * i, currentY, size, dotsVel[i] + 1);

//        if (dots[i] > h && Math.random() < .01) {
//            dots[i] = dotsVel[i] = 0;
//        }
//    }
//}

//anim();






// Init Stats
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '-1000px';
stats.domElement.style.top = '-1000px';
document.body.appendChild(stats.domElement);


(function ($, window) {
    var $window = $(window);
	/**
	 * Makes a nice constellation on canvas
	 * @constructor Constellation
	 */
    function Constellation(canvas, options) {
        var $canvas = $(canvas),
            context = canvas.getContext('2d'),
            defaults = {
                star: {
                    color: 'rgba(255, 255, 255, 0)',
                    width: 1,
                    randomWidth: true
                },
                line: {
                    color: 'rgba(255, 255, 255, .5)',
                    width: 0.2
                },
                position: {
                    x: 0,
                    y: 0
                },
                width: 1920,
                height: 1080,
                velocity: 0.5,
                length: 100,
                distance: 120,
                radius: 150,
                stars: []
            },
            config = $.extend(true, {}, defaults, options);

        function Star() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.vx = (config.velocity - (Math.random() * 0.5));
            this.vy = (config.velocity - (Math.random() * 0.5));

            this.radius = config.star.randomWidth ? (Math.random() * config.star.width) : config.star.width;
        }

        Star.prototype = {
            create: function () {
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                context.fill();
            },

            animate: function () {
                var i;
                for (i = 0; i < config.length; i++) {

                    var star = config.stars[i];

                    if (star.y < 0 || star.y > canvas.height) {
                        star.vx = star.vx;
                        star.vy = - star.vy;
                    } else if (star.x < 0 || star.x > canvas.width) {
                        star.vx = - star.vx;
                        star.vy = star.vy;
                    }

                    star.x += star.vx;
                    star.y += star.vy;
                }
            },

            line: function () {
                var length = config.length,
                    iStar,
                    jStar,
                    i,
                    j;

                for (i = 0; i < length; i++) {
                    for (j = 0; j < length; j++) {
                        iStar = config.stars[i];
                        jStar = config.stars[j];

                        if (
                            (iStar.x - jStar.x) < config.distance &&
                            (iStar.y - jStar.y) < config.distance &&
                            (iStar.x - jStar.x) > - config.distance &&
                            (iStar.y - jStar.y) > - config.distance
                        ) {
                            if (
                                (iStar.x - config.position.x) < config.radius &&
                                (iStar.y - config.position.y) < config.radius &&
                                (iStar.x - config.position.x) > - config.radius &&
                                (iStar.y - config.position.y) > - config.radius
                            ) {
                                context.beginPath();
                                context.moveTo(iStar.x, iStar.y);
                                context.lineTo(jStar.x, jStar.y);
                                context.stroke();
                                context.closePath();
                            }
                        }
                    }
                }
            }
        };

        this.createStars = function () {
            var length = config.length,
                star,
                i;

            context.clearRect(0, 0, canvas.width, canvas.height);

            for (i = 0; i < length; i++) {
                config.stars.push(new Star());
                star = config.stars[i];

                star.create();
            }

            star.line();
            star.animate();
        };

        this.setCanvas = function () {
            canvas.width = config.width;
            canvas.height = config.height;
        };

        this.setContext = function () {
            context.fillStyle = config.star.color;
            context.strokeStyle = config.line.color;
            context.lineWidth = config.line.width;
        };

        this.setInitialPosition = function () {
            if (!options || !options.hasOwnProperty('position')) {
                config.position = {
                    x: canvas.width * 0.5,
                    y: canvas.height * 0.5
                };
            }
        };

        this.loop = function (callback) {
            callback();

            this.rAF = window.requestAnimationFrame(function () {
                stats.begin();
                this.loop(callback);
                stats.end();
            }.bind(this));
        };

        this.handlers = {
            window: {
                mousemove: function (e) {
                    config.position.x = e.pageX - $canvas.offset().left;
                    config.position.y = e.pageY - $canvas.offset().top;
                },
                resize: function () {
                    window.cancelAnimationFrame(this.rAF);
                }
            }
        };

        this.bind = function () {
            $window
                .on('mousemove', this.handlers.window.mousemove)
                .on('resize', this.handlers.window.resize.bind(this));
        };

        this.unbind = function () {
            $window
                .off('mousemove', this.handlers.window.mousemove)
                .off('resize', this.handlers.window.resize);
        }

        this.init = function () {
            this.setCanvas();
            this.setContext();
            this.setInitialPosition();
            this.loop(this.createStars);
            this.bind();
        };
    }

    function instantiate(element, options) {
        var c = new Constellation(element, options);
        c.init();
    }

    $.fn.constellation = function (options) {
        return this.each(function () {
            $window.on('resize', () => {
                instantiate(this, options);
            });

            instantiate(this, options);
        });
    };
})($, window);

// Init plugin
$('canvas').constellation({
    star: {
        width: 3
    },
    line: {
        color: 'rgba(255, 255, 255, 1)'
    },
    length: (window.innerWidth / 6),
    radius: (window.innerWidth / 5)
});