var circles = [];
var rooms = [];

function is_circle_overrap(r1, r2) {
    return (r1.x - r2.x) ** 2 + (r1.y - r2.y) ** 2 < ((r1.r + r2.r) ** 2);
}

function is_rect_overlap(r1, r2) {
    return !(r2.left > r1.right ||
        r2.right < r1.left ||
        r2.top > r1.bottom ||
        r2.bottom < r1.top);
}


function try_add_circle() {
    if (circles.length == 0) {
        circles.push({
            x: 256,
            y: 256,
            r: 20
        });
        return;
    }

    var k = random(circles);
    var direct = random(PI * 2);
    var distance = 0;

    var nr = {
        x: k.x,
        y: k.y,
        r: random(10, 30)
    };

    for (; ;) {
        var f = 0;
        for (var i = 0; i < circles.length; i++) {
            if (is_circle_overrap(circles[i], nr)) {
                f = 1;
                break;
            }
        }
        if (f == 0) {
            circles.push(nr);
            break;
        }
        distance += 1;
        nr.x += cos(direct);
        nr.y += sin(direct);
        if ((nr.y - nr.r) < 0 || (nr.y + nr.r > 512)) {
            break;
        }
        if ((nr.x - nr.r) < 0 || (nr.x + nr.r > 512)) {
            break;
        }
        if (distance > 200) {
            break;
        }
    }
}

function set_rooms() {
    for (var i = 0; i < circles.length; i++) {
        var z = random(0.2, HALF_PI - 0.2);
        var r = {
            top: circles[i].y - sin(z) * circles[i].r,
            bottom: circles[i].y + sin(z) * circles[i].r,
            left: circles[i].x - cos(z) * circles[i].r,
            right: circles[i].x + cos(z) * circles[i].r,
            towards: atan2(256 - circles[i].y, 256 - circles[i].x),
            movable: true,
        }
        rooms.push(r);
    }

}

function try_inflation() {

    for (var i = 0; i < rooms.length; i++) {

        var c = rooms[i];


        if ((c.top < 256 && c.bottom > 256) && (c.left < 256 && c.right > 256)) {
            continue;
        }

        if (c.top < 256 && c.bottom > 256) {
            if ((c.left + c.right) / 2 < 256) {
                c.towards = 0;
            } else {
                c.towards = PI;
            }
        }
        if (c.left < 256 && c.right > 256) {
            if ((c.top + c.bottom) / 2 < 256) {
                c.towards = HALF_PI;
            } else {
                c.towards = PI * 1.5;
            }
        }

        var new_room = {
            ...c
        };
        new_room.top += sin(new_room.towards);
        new_room.bottom += sin(new_room.towards);
        new_room.left += cos(new_room.towards);
        new_room.right += cos(new_room.towards);

        var f = 0;
        for (var j = 0; j < rooms.length; j++) {
            if (i != j) {
                if (is_rect_overlap(new_room, rooms[j])) {
                    f = 1;
                    break;
                }
            }
        }
        if (f == 0) {
            c.top = new_room.top;
            c.bottom = new_room.bottom;
            c.left = new_room.left;
            c.right = new_room.right;
        }

    }
}


function setup() {
    centerX = displayWidth / 2;
    centerY = height / 2;
    createCanvas(displayWidth, displayHeight);
    //  noLoop();
    noSmooth();
    for (var i = 0; i < 70; i++) {
        try_add_circle();
    }
    set_rooms();
    // for (var z = 0; z < 150; z++) {
    //   try_inflation();
    // }
}

function draw() {
    background(220);
    // line(centerX, displayWidth, centerY, displayHeight );
    // line(centerX, displayWidth, centerY, displayHeight );
    line(centerX, displayWidth,centerY, displayHeight);
    ellipseMode(RADIUS);
    try_inflation();
    for (var i = 0; i < rooms.length; i++) {
        //var c = circles[i];
        //ellipse(c.x, c.y, c.r);
        var r = rooms[i];
        rect(r.left, r.top, r.right - r.left, r.bottom - r.top);
    }
}