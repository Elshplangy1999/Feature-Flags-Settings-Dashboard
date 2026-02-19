module.exports = (req, res, next) => {
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (Array.isArray(data)) {
      const page = parseInt(req.query._page) || 1;
      const perPage = parseInt(req.query._per_page) || 10;
      const total = parseInt(res.getHeader("X-Total-Count")) || data.length;
      const lastPage = Math.ceil(total / perPage);
      originalJson({
        data: data,
        pagination: {
          current_page: page,
          from: (page - 1) * perPage + 1,
          last_page: lastPage,
          per_page: perPage,
          to: Math.min(page * perPage, total),
          total: total,
        },
      });
    } else {
      originalJson(data);
    }
  };
  next();
};
