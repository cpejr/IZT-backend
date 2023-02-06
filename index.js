import app from './src/server';

const PORT = process.env.PORT || 3333;
app.listen(PORT, async () => {
  try {
    process.stdout(`✅ Server started at port ${PORT}`);
  } catch (err) {
    process.stdout(err.message, err);
  }
});