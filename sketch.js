let leftEye, rightEye; // 儲存左眼和右眼的位置
let eyeWidth, eyeHeight; // 眼睛範圍的寬度和高度
let eyeX, eyeY; // 眼睛範圍的左上角位置
async function getPoses() {
  if (detector) {
    poses = await detector.estimatePoses(video.elt, {
      maxPoses: 2,
      //flipHorizontal: true,
    });
    // 在這裡取得眼睛的位置
    for (let i = 0; i < poses.length; i++) {
      pose = poses[i];
      for (let j = 0; j < pose.keypoints.length; j++) {
        keypoint = pose.keypoints[j];
        if (keypoint.name === 'left_eye' || keypoint.name === 'right_eye') {
          // 將眼睛的位置存儲起來
          if (keypoint.name === 'left_eye') {
            leftEye = createVector(keypoint.x, keypoint.y);
          } else {
            rightEye = createVector(keypoint.x, keypoint.y);
          }
        }
      }
    }
  }
  requestAnimationFrame(getPoses);
}
function draw() {
  image(video, 0, 0);
  drawSkeleton();

  // 更新眼睛範圍的位置
  if (leftEye && rightEye) {
    eyeWidth = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y) * 1.5;
    eyeHeight = eyeWidth * 0.5;
    eyeX = (leftEye.x + rightEye.x) / 2 - eyeWidth / 2;
    eyeY = (leftEye.y + rightEye.y) / 2 - eyeHeight / 2;
  }

  // 繪製眼睛範圍
  if (eyeWidth && eyeHeight) {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rect(eyeX, eyeY, eyeWidth, eyeHeight);
  }

  // 翻轉影像
  cam = get();
  translate(cam.width, 0);
  scale(-1, 1);
  image(cam, 0, 0);
}

