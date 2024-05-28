// =====dataTable headers=====
export const headers = [
    {
      title: "S/N",
      key: "sno",
      sortable: false,
      align: "center",
    },
    {
      title: "Name",
      key: "name",
      sortable: true,
      align: "center",
    },
    {
      title: "Image",
      key: "image_url",
      sortable: true,
      align: "center",
    },
    {
      title: "Price",
      key: "price",
      sortable: true,
      align: "center",
    },
    {
      title: "Cross Price",
      key: "cross_price",
      sortable: true,
      align: "center",
    },
    {
      title: "Color",
      key: "color",
      sortable: true,
      align: "center",
    },
    {
      title: "Actions",
      key: "action",
      sortable: false,
      align: "center",
    },
  ];
  // ======================================
  
  // ======product category with color======
  export function getProductStatusClass(status) {
    switch (status) {
      case "men's clothing":
        return "green";
      case "jewelery":
        return "yellow";
      case "electronics":
        return "pink";
      default:
        return "red";
    }
  }
  // =======================================