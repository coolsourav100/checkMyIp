export const measureConnectionSpeed = () => {
  return new Promise((resolve) => {
    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg';
    const downloadSize = 250; // in KB
    const numberOfTests = 3;

    let totalSpeed = 0;
    let testsCompleted = 0;

    const testSpeed = () => {
      const startTime = performance.now();
      const download = new Image();

      const finalizeTest = () => {
        testsCompleted++;
        if (testsCompleted === numberOfTests) {
          const averageKbps = totalSpeed / numberOfTests;
          const averageMbps = (averageKbps / 1024).toFixed(2);
          resolve({ kbps: averageKbps.toFixed(2), mbps: averageMbps });
        } else {
          testSpeed();
        }
      };

      download.onload = () => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000; // seconds
        const speed = (downloadSize / duration) * 8; // Kbps
        totalSpeed += speed;
        finalizeTest();
      };

      download.onerror = finalizeTest;

      download.src = `${imageUrl}?cacheBust=${Math.random()}`;
    };

    testSpeed();
  });
};
