export const SimilarityHelper = {
  mostSimilar: (s: string, list: string[], threshold = 0.8) => {
    let maxSimilarity = 0;
    let mostSimilarIdx = -1;
    list.forEach((item, index) => {
      const similarity = SimilarityHelper.similarity(s, item);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        mostSimilarIdx = index;
      }
    });
    return maxSimilarity >= threshold ? mostSimilarIdx : undefined;
  },

  areSimilar: (s1: string, s2: string, threshold = 0.8) => {
    return SimilarityHelper.similarity(s1, s2) >= threshold;
  },

  similarity: (s1: string, s2: string) => {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (
      (longerLength - SimilarityHelper.editDistance(longer, shorter)) /
      (1.0 * longerLength)
    );
  },

  editDistance: (s1: string, s2: string) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  },
};
