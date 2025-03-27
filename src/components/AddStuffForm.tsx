'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { addStuff } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddStuffSchema } from '@/lib/validationSchemas';

type ConditionType = 'excellent' | 'good' | 'fair' | 'poor';
type CategoryType = 'Food' | 'Sporting_Goods' | 'Electronics' | 'Other';

type AddStuffFormData = {
  name: string;
  quantity: number;
  condition: ConditionType;
  category: CategoryType;
  owner: string;
};

const AddStuffForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddStuffFormData>({
    resolver: yupResolver(AddStuffSchema),
  });

  const onSubmit = async (data: AddStuffFormData) => {
    const completeData = { ...data, owner: currentUser }; // ✅ Ensure owner is included
    await addStuff(completeData);
    swal('Success', 'Your item has been added', 'success', {
      timer: 1500,
    }).then(() => {
      window.location.href = '/list';
    });
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    window.location.href = '/auth/signin';
    return null;
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Stuff</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <input
                    type="number"
                    {...register('quantity')}
                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.quantity?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Condition</Form.Label>
                  <select
                    {...register('condition')}
                    className={`form-control ${errors.condition ? 'is-invalid' : ''}`}
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                  <div className="invalid-feedback">{errors.condition?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <select
                    {...register('category')}
                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Sporting_Goods">Sporting Goods</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="invalid-feedback">{errors.category?.message}</div>
                </Form.Group>

                {/* Hidden field not needed since owner is manually added */}
                {/* <input type="hidden" {...register('owner')} value={currentUser} /> */}

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="button"
                        onClick={() => reset()}
                        variant="warning"
                        className="float-right"
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStuffForm;
