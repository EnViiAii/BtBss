import React, { useState, useCallback, useEffect } from "react";
import {
  Page,
  Card,
  FormLayout,
  TextField,
  ChoiceList,
  Select,
  Button,
  Modal,
  ResourceList,
  TextStyle,
  DataTable,
  Icon,
  Spinner,
  Banner,
  Layout,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import { GeneralInformationForm } from "../../component";

function NewPricingRule() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("0");
  const [status, setStatus] = useState("Enable");
  const [productFilter, setProductFilter] = useState("All products");
  const [amount, setAmount] = useState("0");
  const [discountType, setDiscountType] = useState(
    "Apply a price to selected products"
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showPricingDetails, setShowPricingDetails] = useState(false);

  const fetch = useAuthenticatedFetch();

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useAppQuery({ url: "/api/products" });

  const {
    data: collectionsData,
    isLoading: isLoadingCollections,
    isError: isErrorCollections,
  } = useAppQuery({ url: "/api/collections" });

  const {
    data: tagsData,
    isLoading: isLoadingTags,
    isError: isErrorTags,
  } = useAppQuery({ url: "/api/tags" });

  useEffect(() => {
    if (isErrorProducts || isErrorCollections || isErrorTags) {
      setError("Failed to load data.");
      console.error("Error loading data:", {
        isErrorProducts,
        isErrorCollections,
        isErrorTags,
      });
    }
  }, [isErrorProducts, isErrorCollections, isErrorTags]);

  useEffect(() => {
    // console.log("Products Data:", productsData);
    // console.log("Collections Data:", collectionsData);
    // console.log("Tags Data:", tagsData);
    if (productsData && productsData.response) {
      console.log(productsData.response.data.get(0));
    }
  }, [productsData, collectionsData, tagsData]);

  const handleNameChange = useCallback((value) => setName(value), []);
  const handlePriorityChange = useCallback((value) => setPriority(value), []);
  const handleStatusChange = useCallback((value) => setStatus(value), []);
  const handleProductFilterChange = useCallback((value) => {
    setProductFilter(value);
    setShowPricingDetails(false);
    if (value !== "All products") {
      setModalTitle(`Select ${value}`);
      setIsModalActive(true);
    }
  }, []);
  const handleAmountChange = useCallback((value) => setAmount(value), []);
  const handleDiscountTypeChange = useCallback(
    (value) => setDiscountType(value),
    []
  );
  const handleSearchChange = useCallback((value) => setSearchTerm(value), []);

  const handleSubmit = async () => {
    const pricingRule = {
      name,
      priority,
      status,
      productFilter,
      amount,
      discountType,
      selectedItems,
    };
    try {
      const response = await fetch("/api/pricing-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricingRule),
      });
      if (!response.ok) throw new Error("Failed to create pricing rule.");
      console.log("Pricing rule created successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredItems = (() => {
    switch (productFilter) {
      case "Specific products":
        return productsData?.products || [];
      case "Product collections":
        return collectionsData?.collections || [];
      case "Product Tags":
        return tagsData || [];
      default:
        return productsData?.products || [];
    }
  })();

  const filteredItemsData = filteredItems.filter(
    (item) =>
      typeof item.title === "string" &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rows = selectedItems.map((id) => {
    const selectedItem = filteredItems.find((item) => item.id === id);
    return [selectedItem ? selectedItem.title : "Unknown"];
  });

  const productRows = filteredItems.map((item) => [
    item.title,
    "all variant prices - 20%",
  ]);

  return (
    <Page fullWidth>
      {error && <Banner status="critical">{error}</Banner>}
      <Layout>
        <Layout.Section>
          <GeneralInformationForm
            name={name}
            priority={priority}
            status={status}
            onNameChange={handleNameChange}
            onPriorityChange={handlePriorityChange}
            onStatusChange={handleStatusChange}
          />
          <Card title="Apply to Products">
            <Card.Section>
              <ChoiceList
                title="Apply to Products"
                choices={[
                  { label: "All products", value: "All products" },
                  { label: "Specific products", value: "Specific products" },
                  {
                    label: "Product collections",
                    value: "Product collections",
                  },
                  { label: "Product Tags", value: "Product Tags" },
                ]}
                selected={productFilter}
                onChange={handleProductFilterChange}
              />
              {productFilter !== "All products" && (
                <>
                  <Button onClick={() => setIsModalActive(true)} primary>
                    Select {productFilter}
                  </Button>
                  <Modal
                    open={isModalActive}
                    onClose={() => setIsModalActive(false)}
                    title={modalTitle}
                    primaryAction={{
                      content: "Select",
                      onAction: () => setIsModalActive(false),
                    }}
                  >
                    <Modal.Section>
                      <TextField
                        placeholder={`Search ${productFilter}`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        prefix={<Icon source={SearchMinor} />}
                      />
                      {isLoadingProducts ||
                      isLoadingCollections ||
                      isLoadingTags ? (
                        <Spinner size="large" />
                      ) : (
                        <>
                          <p>{selectedItems.length} selected</p>
                          <ResourceList
                            resourceName={{
                              singular: "item",
                              plural: "items",
                            }}
                            items={filteredItemsData}
                            selectedItems={selectedItems}
                            onSelectionChange={setSelectedItems}
                            selectable
                            renderItem={(item) => {
                              const { id, title, media } = item;
                              return (
                                <ResourceList.Item
                                  id={id}
                                  media={
                                    media ? (
                                      <img src={media} alt={title} />
                                    ) : null
                                  }
                                  accessibilityLabel={`View details for ${title}`}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedItems.includes(id)}
                                      onChange={() => {
                                        setSelectedItems((prevSelectedItems) =>
                                          prevSelectedItems.includes(id)
                                            ? prevSelectedItems.filter(
                                                (itemId) => itemId !== id
                                              )
                                            : [...prevSelectedItems, id]
                                        );
                                      }}
                                    />
                                    <TextStyle variation="strong">
                                      {title}
                                    </TextStyle>
                                  </div>
                                </ResourceList.Item>
                              );
                            }}
                          />
                        </>
                      )}
                    </Modal.Section>
                  </Modal>
                </>
              )}
            </Card.Section>
          </Card>
          <Card title="Custom Prices">
            <Card.Section>
              <ChoiceList
                title="Custom Prices"
                choices={[
                  {
                    label: "Apply a price to selected products",
                    value: "Apply a price to selected products",
                  },
                  {
                    label:
                      "Decrease a fixed amount of the original prices of selected products",
                    value:
                      "Decrease a fixed amount of the original prices of selected products",
                  },
                  {
                    label:
                      "Decrease the original prices of selected products by a percentage (%)",
                    value:
                      "Decrease the original prices of selected products by a percentage (%)",
                  },
                ]}
                selected={discountType}
                onChange={handleDiscountTypeChange}
              />
              <TextField
                type="number"
                label="Amount"
                value={amount}
                onChange={handleAmountChange}
              />
            </Card.Section>
          </Card>
          {rows.length > 0 && (
            <Card title="Selected Items">
              <Card.Section>
                <DataTable
                  columnContentTypes={["text"]}
                  headings={["Selected Products/Collections/Tags"]}
                  rows={rows}
                />
              </Card.Section>
            </Card>
          )}
          <Button
            onClick={handleSubmit}
            primary
            loading={isLoadingProducts || isLoadingCollections || isLoadingTags}
          >
            Create Pricing Rule
          </Button>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <Card.Section>
              <Button
                fullWidth
                onClick={() => setShowPricingDetails(!showPricingDetails)}
              >
                Show product pricing details
              </Button>
            </Card.Section>
            {showPricingDetails && (
              <Card.Section>
                {isLoadingProducts || isLoadingCollections || isLoadingTags ? (
                  <Spinner size="large" />
                ) : (
                  <DataTable
                    columnContentTypes={["text", "text"]}
                    headings={["Title", "Modified Price"]}
                    rows={productRows}
                  />
                )}
              </Card.Section>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default NewPricingRule;
