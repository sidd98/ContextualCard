// get title or Description
export function handleTitle(data) {
  data.entities.forEach((value) => {
    data.text = data.text.replace(
      "{}",
      `<span className="max" style="color: ${value.color}">${value.text}</span>`
    );
  });
  return data.text;
}

export function handleImage(data) {
  if (data.image_type === "ext") {
    return data.image_url;
  }

  if (data.image_type === "asset") {
    return data.asset_type;
  }
}

// read from localStorage
export function read(key) {
  try {
    let json = JSON.parse(localStorage.getItem(key));
    return json;
  } catch (err) {
    console.warn(err);
  }
}

// save to localStorage
export function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
