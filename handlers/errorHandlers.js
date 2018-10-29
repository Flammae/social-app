exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

const sendHtml = ({ message, status, stackHighlighted }) => {
  return `
    <h2>${message}</h2>
    <h2>${status}</h2>
    <br/>
    <p>${stackHighlighted}</p>
  `;
};

exports.developmentErrors = (err, req, res, next) => {
  console.log(err);
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+\)/gi,
      "<mark>$&</mark></br>"
    )
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    "text/html": () => res.send(sendHtml(errorDetails)),
    "application/json": () => res.json(errorDetails) // Ajax call, send JSON back
  });
};
