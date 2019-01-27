export default function({ gradients, variants }) {
  return function({ addUtilities, e }) {
    const utilities = Object.keys(gradients).map((name) => {
      const [start, end] = gradients[name];

      return {
        [`.bg-gradient-${e(name)}`]: {
          backgroundImage: `linear-gradient(to right, ${start}, ${end})`
        }
      };
    });

    addUtilities(utilities, variants);
  };
}
